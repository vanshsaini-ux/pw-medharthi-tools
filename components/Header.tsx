import Link from 'next/link';

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';

export default function Header() {
  return (
    <header className="bg-navy-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {BRAND} <span className="text-amber-500">Career Intelligence</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-white/80 md:flex">
          <Link href="/career-fit-finder" className="hover:text-amber-500">Career-Fit Finder</Link>
          <Link href="/career-roi-calculator" className="hover:text-amber-500">ROI Calculator</Link>
          <Link href="/skill-gap-analyzer" className="hover:text-amber-500">Skill Gap Analyzer</Link>
          <Link href="/career-roadmap-generator" className="hover:text-amber-500">Roadmap Generator</Link>
          <Link href="/eligibility-checker" className="hover:text-amber-500">Eligibility Checker</Link>
        </nav>
      </div>
    </header>
  );
}
