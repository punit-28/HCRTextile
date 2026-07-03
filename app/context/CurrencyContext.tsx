'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';

// Currency configurations
export const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee', code: 'INR', locale: 'en-IN' },
  USD: { symbol: '$', name: 'US Dollar', code: 'USD', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', code: 'EUR', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', code: 'GBP', locale: 'en-GB' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', code: 'AED', locale: 'ar-AE' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD', locale: 'en-SG' },
  JPY: { symbol: '¥', name: 'Japanese Yen', code: 'JPY', locale: 'ja-JP' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', code: 'AUD', locale: 'en-AU' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD', locale: 'en-CA' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  convertPrice: (priceINR: number) => string;
  getConvertedValue: (priceINR: number) => number;
  symbol: string;
  rate: number;
  rates: ExchangeRates | null;
  isLoading: boolean;
  lastUpdated: Date | null;
  refreshRates: () => Promise<void>;
  availableCurrencies: typeof CURRENCIES;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Free API endpoints (with fallbacks)
const API_ENDPOINTS = [
  'https://api.exchangerate-api.com/v4/latest/INR',
  'https://api.frankfurter.app/latest?from=INR',
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json'
];

// Fallback rates (used only when all APIs fail)
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

// Cache duration: 30 minutes
const CACHE_DURATION = 30 * 60 * 1000;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('INR');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  // Load cached data on mount
  useEffect(() => {
    const savedCurrency = Cookies.get('currency') as CurrencyCode;
    if (savedCurrency && savedCurrency in CURRENCIES) {
      setCurrencyState(savedCurrency);
    }

    // Load cached rates
    const cachedRates = Cookies.get('exchange_rates');
    const cachedTime = Cookies.get('rates_updated');
    
    if (cachedRates) {
      try {
        const parsedRates = JSON.parse(cachedRates);
        setRates(parsedRates);
        if (cachedTime) {
          setLastUpdated(new Date(cachedTime));
        }
        // Check if cache is still valid
        if (cachedTime) {
          const cacheAge = Date.now() - new Date(cachedTime).getTime();
          if (cacheAge < CACHE_DURATION) {
            setIsLoading(false); // Use cached data
          }
        }
      } catch (e) {
        console.error('Error parsing cached rates:', e);
      }
    }

    // Fetch fresh rates
    fetchRates();
    // Refresh every 30 minutes
    const interval = setInterval(fetchRates, CACHE_DURATION);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch rates with multiple API fallbacks
  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    let success = false;

    // Try each API endpoint
    for (const endpoint of API_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          // Add timeout
          signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) continue;

        const data = await response.json();
        let extractedRates: ExchangeRates = {};

        // Handle different API response formats
        if (endpoint.includes('exchangerate-api')) {
          extractedRates = data.rates;
        } else if (endpoint.includes('frankfurter')) {
          extractedRates = data.rates;
        } else if (endpoint.includes('currency-api')) {
          // Handle the currency-api format
          const inrData = data.inr;
          if (inrData) {
            Object.keys(CURRENCIES).forEach(code => {
              const lowerCode = code.toLowerCase();
              if (inrData[lowerCode] !== undefined) {
                extractedRates[code] = inrData[lowerCode];
              }
            });
          }
        }

        // Ensure we have rates for all our currencies
        if (extractedRates && Object.keys(extractedRates).length > 0) {
          // Add INR if missing
          if (!extractedRates.INR) extractedRates.INR = 1;
          
          // Ensure we have rates for all currencies
          Object.keys(CURRENCIES).forEach(code => {
            if (!extractedRates[code]) {
              // Try to find from other sources or use fallback
              extractedRates[code] = FALLBACK_RATES[code] || 1;
            }
          });

          setRates(extractedRates);
          setLastUpdated(new Date());
          setIsOffline(false);
          success = true;

          // Cache the rates
          Cookies.set('exchange_rates', JSON.stringify(extractedRates), { 
            expires: 1, 
            path: '/' 
          });
          Cookies.set('rates_updated', new Date().toISOString(), { 
            expires: 1, 
            path: '/' 
          });

          break; // Exit loop on success
        }
      } catch (error) {
        console.error(`API ${endpoint} failed:`, error);
        continue; // Try next endpoint
      }
    }

    // If all APIs failed, use fallback
    if (!success) {
      console.warn('All APIs failed, using fallback rates');
      setRates(FALLBACK_RATES);
      setLastUpdated(new Date());
      setIsOffline(true);
      
      // Still cache the fallback rates
      Cookies.set('exchange_rates', JSON.stringify(FALLBACK_RATES), { 
        expires: 1, 
        path: '/' 
      });
    }

    setIsLoading(false);
  }, []);

  // Set currency and save to cookie
  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    if (newCurrency in CURRENCIES) {
      setCurrencyState(newCurrency);
      Cookies.set('currency', newCurrency, { 
        expires: 365,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }
  }, []);

  // Get converted value (number)
  const getConvertedValue = useCallback((priceINR: number): number => {
    if (!priceINR || isNaN(priceINR) || !rates) return 0;
    const rate = rates[currency] || 1;
    return priceINR * rate;
  }, [currency, rates]);

  // Convert price to formatted string (memoized)
  const convertPrice = useCallback((priceINR: number): string => {
    if (!priceINR || isNaN(priceINR) || !rates) {
      return `${CURRENCIES[currency]?.symbol || '₹'}0`;
    }
    
    const converted = getConvertedValue(priceINR);
    const config = CURRENCIES[currency];
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(converted);
    } catch (error) {
      // Fallback formatting
      return `${config.symbol}${converted.toFixed(2)}`;
    }
  }, [currency, rates, getConvertedValue]);

  // Memoized values
  const value = useMemo(() => ({
    currency,
    setCurrency,
    convertPrice,
    getConvertedValue,
    symbol: CURRENCIES[currency]?.symbol || '₹',
    rate: rates ? rates[currency] || 1 : 1,
    rates,
    isLoading,
    lastUpdated,
    refreshRates: fetchRates,
    availableCurrencies: CURRENCIES,
    isOffline,
  }), [currency, setCurrency, convertPrice, getConvertedValue, rates, isLoading, lastUpdated, fetchRates, isOffline]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}