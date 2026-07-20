import { InputHTMLAttributes } from 'react';

export default function NumberInput({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="number"
      inputMode="numeric"
      className={`w-full rounded-lg border border-navy-700/20 bg-white px-3 py-2.5 text-base text-navy-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${className}`}
      {...rest}
    />
  );
}
