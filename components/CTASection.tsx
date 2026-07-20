interface CTASectionProps {
  heading: string;
  subheading?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({ heading, subheading, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CTASectionProps) {
  return (
    <section className="rounded-xl2 bg-navy-900 px-6 py-10 text-center text-white">
      <h2 className="font-display text-2xl font-semibold">{heading}</h2>
      {subheading && <p className="mt-2 text-white/70">{subheading}</p>}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <a href={primaryHref} className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-600">
          {primaryLabel}
        </a>
        {secondaryLabel && secondaryHref && (
          <a href={secondaryHref} className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10">
            {secondaryLabel}
          </a>
        )}
      </div>
    </section>
  );
}
