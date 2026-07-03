'use client';

import { useCurrency } from '@/app/context/CurrencyContext';
import { useMemo } from 'react';

export function useCurrencyPrice(priceINR: number) {
  const { convertPrice, getConvertedValue, currency, symbol } = useCurrency();

  return useMemo(() => ({
    formatted: convertPrice(priceINR),
    value: getConvertedValue(priceINR),
    currency,
    symbol,
    original: priceINR,
    originalFormatted: new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(priceINR),
  }), [priceINR, convertPrice, getConvertedValue, currency, symbol]);
}