import type { Metadata } from 'next';
import { Compass, Calculator, ScanSearch, Map, ShieldCheck } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import CTASection from '@/components/CTASection';
import { EXPLORE_PROGRAMS_URL } from '@/lib/links';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';

export const metadata: Metadata = {
  title: `${BRAND} Career Intelligence — 5 Free AI Tools to Plan Your Career`,
  description: `Free AI-powered tools from ${BRAND}: find your best-fit degree, calculate your ROI, check your job-readiness, build a career roadmap, and check eligibility - instantly.`,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${BRAND} Career Intelligence`,
    description: 'Five free, data-grounded AI tools to plan your career - not marketing gimmicks dressed up as AI.',
    url: SITE_URL,
    type: 'website'
  }
};

const TOOLS = [
  {
    href: '/career-fit-finder',
    icon: Compass,
    layerLabel: 'Layer 1 · Discovery',
    title: 'Career-Fit Finder',
    description: "Turns an undecided visitor into a qualified, program-matched lead in under 3 minutes.",
    ctaLabel: 'Get My Full Match Report'
  },
  {
    href: '/career-roi-calculator',
    icon: Calculator,
    layerLabel: 'Layer 2 · Decision',
    title: 'Career ROI & Salary Growth Calculator',
    description: 'Converts a price-sensitive, ROI-anxious visitor by making the payback math concrete instead of abstract.',
    ctaLabel: 'Show My Full 5-Year Projection'
  },
  {
    href: '/skill-gap-analyzer',
    icon: ScanSearch,
    layerLabel: 'Layer 2 · Decision',
    title: 'Skill Gap Analyzer',
    description: "Gives an anxious job-seeker a concrete, personalised reason to enrol: here's exactly what's missing.",
    ctaLabel: 'Unlock My Full Skill Gap Report'
  },
  {
    href: '/career-roadmap-generator',
    icon: Map,
    layerLabel: 'Layer 2/3 · Decision → Conversion',
    title: 'AI Career Roadmap Generator',
    description: "Turns 'I want to become a ___' into a real, month-by-month plan of skills, certifications and courses.",
    ctaLabel: 'Unlock My Full Roadmap'
  },
  {
    href: '/eligibility-checker',
    icon: ShieldCheck,
    layerLabel: 'Layer 3 · Conversion',
    title: 'Eligibility & Admission Fit Checker',
    description: 'The lowest-friction, highest-intent tool in the stack - see your eligibility instantly, with zero gating.',
    ctaLabel: 'Check My Eligibility Now'
  }
];

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: TOOLS.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${tool.href}`,
      name: tool.title
    }))
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative mb-16 overflow-hidden rounded-xl2 px-4 py-16 text-center sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-dot-grid opacity-[0.35] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]"
        />
        <p className="eyebrow">{BRAND} Career Intelligence</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-navy-900 sm:text-5xl">
          Five free AI tools to plan your career - grounded in real data, not guesswork.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-navy-700/80">
          Built on the same research backing every {BRAND} program, so every recommendation, every number, and
          every roadmap step is explainable - not a black box.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href={EXPLORE_PROGRAMS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-100/50 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm transition hover:bg-amber-100"
          >
            Want to see the full course catalogue?
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-navy-950">
              Explore all programs →
            </span>
          </a>
        </div>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 font-mono text-xs text-navy-700/70">
          <span className="rounded-full border border-navy-700/10 bg-white px-3.5 py-1.5 shadow-sm">UGC-DEB Recognised Degrees</span>
          <span className="rounded-full border border-navy-700/10 bg-white px-3.5 py-1.5 shadow-sm">87 Career-Aligned Programs</span>
          <span className="rounded-full border border-navy-700/10 bg-white px-3.5 py-1.5 shadow-sm">Built on India Skills Report + WEF Future of Jobs Data</span>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </section>

      <section className="mt-20 grid gap-10 card p-8 md:grid-cols-2 md:p-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy-900">Why {BRAND} built this</h2>
          <p className="mt-3.5 leading-relaxed text-navy-700/80">
            Most &ldquo;career quizzes&rdquo; online are marketing gimmicks dressed up as AI. Ours aren&rsquo;t. Every
            recommendation across these five tools traces back to the same research library that shapes {BRAND}&rsquo;s
            course design and content - named, dated, sourced reports, not invented statistics. That&rsquo;s the same
            standard we hold our own curriculum to.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy-900">How the five tools work together</h2>
          <p className="mt-3.5 leading-relaxed text-navy-700/80">
            <strong>Discovery</strong> - Career-Fit Finder finds your program. <strong>Decision</strong> - the ROI
            Calculator and Skill Gap Analyzer help you validate the choice. <strong>Planning</strong> - the AI
            Roadmap Generator turns the decision into a plan. <strong>Conversion</strong> - the Eligibility Checker
            gets you to &ldquo;Apply Now&rdquo; with zero friction. Start at any stage - each tool links to the next.
          </p>
        </div>
      </section>

      <div className="mt-20">
        <CTASection
          heading="Not sure where to start?"
          subheading="Take the 3-minute Career-Fit Finder - it's the fastest way in."
          primaryLabel="Take the Career-Fit Finder"
          primaryHref="/career-fit-finder"
        />
      </div>
    </div>
  );
}
