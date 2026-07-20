import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  href: string;
  icon: LucideIcon;
  layerLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export default function ToolCard({ href, icon: Icon, layerLabel, title, description, ctaLabel }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl2 border border-navy-700/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-500"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-amber-500">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="font-mono text-xs uppercase tracking-wide text-navy-600">{layerLabel}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-navy-700/80">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 group-hover:gap-2">
        {ctaLabel} →
      </span>
    </Link>
  );
}
