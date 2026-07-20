const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PRIVACY_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || '#';

const TOOL_LINKS = [
  { href: '/career-fit-finder', label: 'Career-Fit Finder' },
  { href: '/career-roi-calculator', label: 'ROI Calculator' },
  { href: '/skill-gap-analyzer', label: 'Skill Gap Analyzer' },
  { href: '/career-roadmap-generator', label: 'Roadmap Generator' },
  { href: '/eligibility-checker', label: 'Eligibility Checker' }
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-navy-950 text-white/70">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-base font-semibold text-white">{BRAND} Career Intelligence</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
              These tools provide data-informed guidance and are not a substitute for personalised counselling.
              For a detailed discussion of your specific situation, {BRAND}&rsquo;s program counsellors are
              available via chat, call, or WhatsApp.
            </p>
          </div>
          <div>
            <p className="eyebrow text-amber-500/90">Tools</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/70 transition hover:text-amber-500">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
          <span>© {new Date().getFullYear()} {BRAND}</span>
          <a href={PRIVACY_URL} className="underline transition hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
