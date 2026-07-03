'use client';

import { useCurrency } from '@/app/context/CurrencyContext';
import { useCurrencyPrice } from '../app/api/useCurrency';
import { memo } from 'react';

interface CurrencyPriceProps {
  priceINR: number;
  className?: string;
  showOriginal?: boolean;
  showSymbol?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loadingClassName?: string;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl',
};

const CurrencyPrice = memo(function CurrencyPrice({
  priceINR,
  className = '',
  showOriginal = false,
  showSymbol = true,
  size = 'md',
  loadingClassName = 'animate-pulse bg-gray-200 rounded',
}: CurrencyPriceProps) {
  const { isLoading } = useCurrency();
  const { formatted, originalFormatted, value } = useCurrencyPrice(priceINR);

  if (isLoading) {
    return (
      <div className={`${sizeClasses[size]} ${loadingClassName} h-6 w-20`}>
        &nbsp;
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`font-semibold ${sizeClasses[size]}`}>
        {showSymbol ? formatted : value.toFixed(0)}
      </span>
      {showOriginal && (
        <span className="text-xs text-gray-400 line-through">
          {originalFormatted}
        </span>
      )}
    </div>
  );
});

export default CurrencyPrice;