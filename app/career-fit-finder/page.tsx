import type { Metadata } from 'next';
import CareerFitFinderApp from './CareerFitFinderApp';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedTools from '@/components/RelatedTools';
import CTASection from '@/components/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PATH = '/career-fit-finder';

export const metadata: Metadata = {
  title: `Which Degree Is Right For You? | Free AI Career-Fit Quiz`,
  description: `Take ${BRAND}'s 3-minute AI Career-Fit Finder and get matched to the right online degree - with real salary data and job roles, not guesswork.`,
  alternates: { canonical: PATH },
  openGraph: { title: 'Which Degree Is Right For You?', description: '3-minute AI quiz matching your profile to the best-fit degree.', url: `${SITE_URL}${PATH}`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Which Degree Is Right For You?' }
};

const FAQ_ITEMS = [
  { question: 'Is this quiz actually free?', answer: 'Yes — the quiz and your top match are completely free. No card, no commitment.' },
  { question: 'How is this different from just browsing the course list?', answer: 'The course list tells you what exists. This tool tells you what fits your specific background, goals and time availability - and explains its reasoning, unlike a generic filter.' },
  { question: 'What if none of the matches feel right?', answer: 'You can retake the quiz anytime, or talk to a program counsellor who can walk through options live.' },
  { question: 'Will my data be shared with anyone?', answer: 'No. Your answers are used only to generate your match and, if you choose to share your contact details, to send your full report - nothing else.' }
];

export default function CareerFitFinderPage() {
  const softwareAppLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${BRAND} Career-Fit Finder`,
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Career Intelligence', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Career-Fit Finder', item: `${SITE_URL}${PATH}` }
    ]
  };

  return (
    <div className="space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">Layer 1 · Discovery</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          Which of {BRAND}&rsquo;s 18 Degrees Is Actually Right For You?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700/80">
          Answer 6 quick questions. Our AI matches your interests, experience and goals to the program with the
          strongest career fit - and shows you exactly why.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          ['1', 'Tell us your background', 'Current qualification, experience, and what you\u2019re hoping to change about your career.'],
          ['2', 'AI scores your answers', 'Scored against all 87 programs on the same dimensions real career outcomes are built on.'],
          ['3', 'Get your top 3 matches', 'Instantly, each with a plain-English reason, expected roles, and salary data.']
        ].map(([n, t, d]) => (
          <div key={n} className="rounded-xl2 border border-navy-700/10 bg-white p-5">
            <span className="font-mono text-xs text-amber-600">Step {n}</span>
            <h3 className="mt-1 font-semibold text-navy-900">{t}</h3>
            <p className="mt-1 text-sm text-navy-700/70">{d}</p>
          </div>
        ))}
      </section>

      <section aria-label="Career-Fit Finder tool">
        <CareerFitFinderApp />
      </section>

      <section className="rounded-xl2 border border-teal-500/30 bg-teal-100/40 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Why trust this result</h2>
        <p className="mt-2 text-sm text-navy-800">
          Every match is benchmarked against real workforce data - the same research backing {BRAND}&rsquo;s course
          design, not marketing copy.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">Frequently asked questions</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <RelatedTools excludeHref={PATH} />

      <CTASection
        heading="Ready to stop guessing?"
        subheading="Get your AI-matched degree recommendation now."
        primaryLabel="Take the Quiz"
        primaryHref="#top"
        secondaryLabel="Talk to a Counsellor"
        secondaryHref={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '')}`}
      />
    </div>
  );
}
