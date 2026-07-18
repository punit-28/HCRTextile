'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo, useRef } from 'react';
import Cookies from 'js-cookie';

// Currency configurations
export const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee', code: 'INR', locale: 'en-IN', decimal: 2 },
  USD: { symbol: '$', name: 'US Dollar', code: 'USD', locale: 'en-US', decimal: 2 },
  EUR: { symbol: '€', name: 'Euro', code: 'EUR', locale: 'de-DE', decimal: 2 },
  GBP: { symbol: '£', name: 'British Pound', code: 'GBP', locale: 'en-GB', decimal: 2 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', code: 'AED', locale: 'ar-AE', decimal: 2 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD', locale: 'en-SG', decimal: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY', locale: 'ja-JP', decimal: 0 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD', locale: 'en-AU', decimal: 2 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD', locale: 'en-CA', decimal: 2 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceINR: number, options?: { format?: boolean; decimals?: number }) => string | number;
  getConvertedValue: (priceINR: number) => number;
  symbol: string;
  rate: number;
  rates: ExchangeRates | null;
  isLoading: boolean;
  isOffline: boolean;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
  availableCurrencies: typeof CURRENCIES;
  formatPrice: (amount: number, currencyCode?: CurrencyCode) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// API endpoints with priority
const API_ENDPOINTS = [
  {
    url: 'https://api.exchangerate-api.com/v4/latest/INR',
    parser: (data: unknown) => (data as { rates: ExchangeRates }).rates,
  },
  {
    url: 'https://api.frankfurter.app/latest?from=INR',
    parser: (data: unknown) => (data as { rates: ExchangeRates }).rates,
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json',
    parser: (data: unknown) => {
      const rates: ExchangeRates = { INR: 1 };
      const inrData = data as { inr?: Record<string, number> };
      if (inrData.inr) {
        Object.keys(CURRENCIES).forEach(code => {
          const lowerCode = code.toLowerCase();
          if (inrData.inr?.[lowerCode] !== undefined) {
            rates[code] = inrData.inr[lowerCode];
          }
        });
      }
      return rates;
    },
  },
];

// Fallback rates with more accurate values
const FALLBACK_RATES: ExchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  SGD: 0.016,
  JPY: 1.6,
  AUD: 0.018,
  CAD: 0.016,
};

// Constants
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
const RETRY_DELAY = 5000; // 5 seconds
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT = 8000; // 8 seconds

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const savedCurrency = Cookies.get('currency') as CurrencyCode;
    return savedCurrency && savedCurrency in CURRENCIES ? savedCurrency : 'INR';
  });
  
  const initialCache = useMemo(() => {
    const cachedRates = Cookies.get('exchange_rates');
    const cachedTime = Cookies.get('rates_updated');
    let initialRates: ExchangeRates | null = null;
    let initialLastUpdated: Date | null = null;
    let initialIsLoading = true;
    let isCacheValid = false;

    if (cachedRates && cachedTime) {
      try {
        const parsedRates = JSON.parse(cachedRates);
        const cacheAge = Date.now() - new Date(cachedTime).getTime();

        if (parsedRates && typeof parsedRates === 'object' && !Number.isNaN(cacheAge)) {
          initialRates = parsedRates;
          initialLastUpdated = new Date(cachedTime);

          if (cacheAge < CACHE_DURATION) {
            initialIsLoading = false;
            isCacheValid = true;
          }
        }
      } catch {
        // Ignore invalid cached rates
      }
    }

    return { initialRates, initialLastUpdated, initialIsLoading, isCacheValid };
  }, []);

  const [rates, setRates] = useState<ExchangeRates | null>(initialCache.initialRates);
  const [isLoading, setIsLoading] = useState(initialCache.initialIsLoading);
  const [isOffline, setIsOffline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(initialCache.initialLastUpdated);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const ratesRef = useRef<ExchangeRates | null>(initialCache.initialRates);
  const isOfflineRef = useRef(isOffline);

  useEffect(() => {
    ratesRef.current = rates;
  }, [rates]);

  useEffect(() => {
    isOfflineRef.current = isOffline;
  }, [isOffline]);

  // Fetch rates with retry logic
  const fetchRates = useCallback(async (): Promise<void> => {
    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setIsLoading(true);

    try {
      // Try each API endpoint
      for (const endpoint of API_ENDPOINTS) {
        try {
          const response = await fetch(endpoint.url, {
            signal: AbortSignal.timeout(REQUEST_TIMEOUT),
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache',
            },
          });

          if (!response.ok) continue;

          const data = await response.json();
          const extractedRates = endpoint.parser(data);

          if (extractedRates && Object.keys(extractedRates).length > 0) {
            // Ensure INR exists
            if (!extractedRates.INR) extractedRates.INR = 1;
            
            // Ensure all currencies have rates
            const completeRates = { ...FALLBACK_RATES, ...extractedRates };
            
            // Filter to only our currencies
            const finalRates: ExchangeRates = {};
            Object.keys(CURRENCIES).forEach(code => {
              finalRates[code] = completeRates[code] || FALLBACK_RATES[code] || 1;
            });

            setRates(finalRates);
            setLastUpdated(new Date());
            setIsOffline(false);
            retryCountRef.current = 0;

            // Cache the rates
            Cookies.set('exchange_rates', JSON.stringify(finalRates), { 
              expires: 1, 
              path: '/',
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
            
            Cookies.set('rates_updated', new Date().toISOString(), { 
              expires: 1, 
              path: '/',
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });

            setIsLoading(false);
            return; // Success
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            console.log('Request was aborted');
            return;
          }
          console.error(`API ${endpoint.url} failed:`, error);
          continue; // Try next endpoint
        }
      }

      // All APIs failed - use fallback
      console.warn('All APIs failed, using fallback rates');
      setRates(FALLBACK_RATES);
      setLastUpdated(new Date());
      setIsOffline(true);
      
      // Cache fallback rates
      Cookies.set('exchange_rates', JSON.stringify(FALLBACK_RATES), { 
        expires: 1, 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      
      Cookies.set('rates_updated', new Date().toISOString(), { 
        expires: 1, 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Retry logic
      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current++;
        setTimeout(() => {
          if (!isOfflineRef.current) {
            fetchRates();
          }
        }, RETRY_DELAY * retryCountRef.current);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      console.error('Fatal error fetching rates:', error);
      
      // Use fallback if available
      if (!ratesRef.current) {
        setRates(FALLBACK_RATES);
        setLastUpdated(new Date());
        setIsOffline(true);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Load cached rates on mount and set up refresh/listeners
  useEffect(() => {
    if (!initialCache.isCacheValid) {
      fetchRates();
    }

    const interval = setInterval(() => {
      if (!isOfflineRef.current) {
        fetchRates();
      }
    }, CACHE_DURATION);

    const handleOnline = () => {
      setIsOffline(false);
      fetchRates();
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [initialCache.isCacheValid, fetchRates]);

  // Set currency and save to cookie
  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    if (newCurrency in CURRENCIES) {
      setCurrencyState(newCurrency);
      Cookies.set('currency', newCurrency, { 
        expires: 365,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    }
  }, []);

  // Get converted value (number)
  const getConvertedValue = useCallback((priceINR: number): number => {
    if (!priceINR || isNaN(priceINR) || priceINR < 0) return 0;
    if (!rates) return priceINR; // Return INR if rates not loaded
    
    const rate = rates[currency] || 1;
    return Number((priceINR * rate).toFixed(4));
  }, [currency, rates]);

  // Format price with proper currency formatting
  const formatPrice = useCallback((amount: number, currencyCode?: CurrencyCode): string => {
    const code = currencyCode || currency;
    const config = CURRENCIES[code];
    
    if (!config) {
      return `₹${amount.toFixed(2)}`;
    }

    try {
      const formatter = new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: config.decimal || 2,
        maximumFractionDigits: config.decimal || 2,
      });
      return formatter.format(amount);
    } catch (error) {
      // Fallback formatting
      return `${config.symbol}${amount.toFixed(config.decimal || 2)}`;
    }
  }, [currency]);

  // Convert price with options
  const convertPrice = useCallback((priceINR: number, options?: { format?: boolean; decimals?: number }): string | number => {
    const { format = true, decimals } = options || {};
    
    if (!priceINR || isNaN(priceINR) || priceINR < 0) {
      return format ? formatPrice(0) : 0;
    }

    const converted = getConvertedValue(priceINR);
    
    if (!format) {
      return decimals !== undefined ? Number(converted.toFixed(decimals)) : converted;
    }

    return formatPrice(converted);
  }, [getConvertedValue, formatPrice]);

  // Memoized context value
  const value = useMemo(() => ({
    currency,
    setCurrency,
    convertPrice,
    getConvertedValue,
    formatPrice,
    symbol: CURRENCIES[currency]?.symbol || '₹',
    rate: rates ? rates[currency] || 1 : 1,
    rates,
    isLoading,
    isOffline,
    lastUpdated,
    refreshRates: fetchRates,
    availableCurrencies: CURRENCIES,
  }), [currency, setCurrency, convertPrice, getConvertedValue, formatPrice, rates, isLoading, isOffline, lastUpdated, fetchRates]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook with error boundary
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Helper function for formatting price outside React
export function formatPriceStatic(amount: number, currencyCode: CurrencyCode = 'INR'): string {
  const config = CURRENCIES[currencyCode];
  if (!config) {
    return `₹${amount.toFixed(2)}`;
  }

  try {
    const formatter = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      minimumFractionDigits: config.decimal || 2,
      maximumFractionDigits: config.decimal || 2,
    });
    return formatter.format(amount);
  } catch {
    return `${config.symbol}${amount.toFixed(config.decimal || 2)}`;
  }
}