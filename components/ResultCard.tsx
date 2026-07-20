import { ReactNode } from 'react';

interface ResultCardProps {
  title: string;
  children: ReactNode;
  accent?: 'amber' | 'teal' | 'coral';
}

const ACCENT_CLASS: Record<string, string> = {
  amber: 'border-amber-500/40 bg-amber-100/40',
  teal: 'border-teal-500/40 bg-teal-100/40',
  coral: 'border-coral-500/40 bg-coral-100/40'
};

export default function ResultCard({ title, children, accent = 'amber' }: ResultCardProps) {
  return (
    <div className={`rounded-xl2 border p-6 ${ACCENT_CLASS[accent]}`}>
      <h3 className="font-display text-xl font-semibold text-navy-900">{title}</h3>
      <div className="mt-3 text-navy-800">{children}</div>
    </div>
  );
}
