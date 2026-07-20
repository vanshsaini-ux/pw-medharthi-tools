import type { Metadata } from 'next';
import CareerRoadmapGeneratorApp from './CareerRoadmapGeneratorApp';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedTools from '@/components/RelatedTools';
import CTASection from '@/components/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PATH = '/career-roadmap-generator';

export const metadata: Metadata = {
  title: 'AI Career Roadmap Generator | Free Month-by-Month Plan',
  description: `Tell our AI what you want to become. Get a real, month-by-month roadmap of skills, certifications and courses - built on real career data from ${BRAND}.`,
  alternates: { canonical: PATH },
  openGraph: { title: 'AI Career Roadmap Generator', description: 'Turn "I want to become a ___" into a month-by-month plan.', url: `${SITE_URL}${PATH}`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'AI Career Roadmap Generator' }
};

const FAQ_ITEMS = [
  { question: 'Is this a chatbot or a fixed report?', answer: "It's a guided generator - you get a structured, downloadable roadmap, not an open-ended chat that could drift off-topic." },
  { question: 'Can I share my roadmap with someone else?', answer: 'Yes - the full roadmap is downloadable as a PDF you can share or print.' },
  { question: "What if my target role isn't listed?", answer: 'Use the free-text field to describe it - the tool will build the closest matching roadmap and flag if a program partially or fully covers it.' },
  { question: 'Will I get reminders to stay on track?', answer: 'Optionally, yes - you can opt in to milestone reminders over email or WhatsApp when you unlock your full roadmap.' }
];

export default function CareerRoadmapGeneratorPage() {
  const softwareAppLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${BRAND} AI Career Roadmap Generator`, applicationCategory: 'EducationApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Career Intelligence', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'AI Career Roadmap Generator', item: `${SITE_URL}${PATH}` }] };

  return (
    <div className="space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">Layer 2/3 · Decision → Conversion</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-navy-900 sm:text-5xl">Tell Us What You Want to Become. We&rsquo;ll Build the Roadmap.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700/80">
          &ldquo;I want to become a ___ in ___ months.&rdquo; That&rsquo;s it. Our AI turns it into a real,
          month-by-month plan - skills, certifications, projects, and the courses that get you there.
        </p>
      </section>

      <section aria-label="AI Career Roadmap Generator tool">
        <CareerRoadmapGeneratorApp />
      </section>

      <section className="rounded-xl2 border border-teal-500/30 bg-teal-100/40 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Why trust this result</h2>
        <p className="mt-2 text-sm text-navy-800">
          Unlike open-ended AI chat advice, every milestone in your roadmap is grounded in real skill and job-role
          data - and wherever a milestone matches a {BRAND} course, we tell you exactly which one and why.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">Frequently asked questions</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <RelatedTools excludeHref={PATH} />

      <CTASection heading="Stop wondering how to get there." subheading="Get the exact plan." primaryLabel="Build My Roadmap" primaryHref="#top" />
    </div>
  );
}
