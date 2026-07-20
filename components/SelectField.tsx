import { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

export default function SelectField({ options, placeholder, className = '', ...rest }: SelectFieldProps) {
  return (
    <select
      className={`w-full rounded-lg border border-navy-700/20 bg-white px-3 py-2.5 text-base text-navy-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${className}`}
      {...rest}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
