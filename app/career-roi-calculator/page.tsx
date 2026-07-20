import type { Metadata } from 'next';
import CareerRoiCalculatorApp from './CareerRoiCalculatorApp';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedTools from '@/components/RelatedTools';
import CTASection from '@/components/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PATH = '/career-roi-calculator';

export const metadata: Metadata = {
  title: 'Career ROI Calculator | Salary Growth After a Degree',
  description: `See exactly when your ${BRAND} degree pays for itself - a real salary and break-even projection, not a sales pitch.`,
  alternates: { canonical: PATH },
  openGraph: { title: 'Career ROI Calculator', description: 'See when your degree pays for itself.', url: `${SITE_URL}${PATH}`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Career ROI Calculator' }
};

const FAQ_ITEMS = [
  { question: 'Are these salary numbers guaranteed?', answer: 'No calculator can guarantee an individual salary outcome. These are data-backed projections based on real industry benchmarks for your target role and experience band, meant to inform your decision, not promise a number.' },
  { question: "What if I'm a fresher with no current salary?", answer: "Select 'fresher, no salary yet' - the calculator will project your likely starting salary and growth curve based on the target role alone." },
  { question: 'Does this account for EMI/loan costs?', answer: 'Yes - the full unlocked report includes a fee-vs-EMI-vs-salary-gain comparison so you can see the real net benefit, not just the gross salary increase.' },
  { question: 'Can I compare two different programs?', answer: 'Yes - run the calculator once per program to compare break-even timelines side by side.' }
];

export default function CareerRoiCalculatorPage() {
  const softwareAppLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${BRAND} Career ROI Calculator`, applicationCategory: 'EducationApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Career Intelligence', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Career ROI Calculator', item: `${SITE_URL}${PATH}` }] };

  return (
    <div className="space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">Layer 2 · Decision Support</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-navy-900 sm:text-5xl">See Exactly When Your Degree Pays for Itself</h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700/80">
          Enter your current role and target program. Get a real, data-backed projection of your salary growth and
          break-even month - before you enrol, not after.
        </p>
      </section>

      <section aria-label="Career ROI Calculator tool">
        <CareerRoiCalculatorApp />
      </section>

      <section className="rounded-xl2 border border-teal-500/30 bg-teal-100/40 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Why trust this result</h2>
        <p className="mt-2 text-sm text-navy-800">
          Every projection is benchmarked against sourced, named reports - not invented numbers. You&rsquo;ll see the
          exact source behind every figure on your result screen.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">Frequently asked questions</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <RelatedTools excludeHref={PATH} />

      <CTASection heading="Stop wondering if it's worth it." subheading="See your actual numbers." primaryLabel="Calculate My ROI" primaryHref="#top" />
    </div>
  );
}
