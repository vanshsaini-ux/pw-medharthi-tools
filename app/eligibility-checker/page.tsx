import type { Metadata } from 'next';
import EligibilityCheckerApp from './EligibilityCheckerApp';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedTools from '@/components/RelatedTools';
import CTASection from '@/components/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PATH = '/eligibility-checker';

export const metadata: Metadata = {
  title: 'Eligibility Checker | Am I Eligible? Instant Check',
  description: `Check your eligibility across all 18 ${BRAND} UGC-DEB recognised programs instantly - no waiting, no email required to see your result.`,
  alternates: { canonical: PATH },
  openGraph: { title: 'Eligibility Checker', description: 'Check your eligibility instantly across 18 programs.', url: `${SITE_URL}${PATH}`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Eligibility Checker' }
};

const FAQ_ITEMS = [
  { question: 'Do I need to enter my email to see my result?', answer: "No - your eligibility result is shown immediately and in full. We only ask for contact details if you choose to proceed with 'Apply Now.'" },
  { question: "What does 'Eligible with Bridge Course' mean?", answer: 'Some programs require a short bridge/foundation course for applicants from certain academic backgrounds. If this applies to you, the tool explains exactly what is required.' },
  { question: "What if I'm not eligible for my first-choice program?", answer: "The tool suggests alternative programs that better match your current qualification, so you're never left with just a 'no.'" },
  { question: 'Does category (SC/ST/OBC/EWS) affect eligibility?', answer: 'Category affects fee and scholarship eligibility, not core admission eligibility, which is based on qualification and experience per UGC-DEB norms.' }
];

export default function EligibilityCheckerPage() {
  const softwareAppLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${BRAND} Eligibility Checker`, applicationCategory: 'EducationApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Career Intelligence', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Eligibility Checker', item: `${SITE_URL}${PATH}` }] };

  return (
    <div className="space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">Layer 3 · Conversion</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-navy-900 sm:text-5xl">Am I Eligible? Check Instantly Across All 18 Programs.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700/80">
          Enter your qualification and experience. See your eligibility status immediately - no email required, no
          waiting for a callback.
        </p>
      </section>

      <section aria-label="Eligibility Checker tool">
        <EligibilityCheckerApp />
      </section>

      <section className="rounded-xl2 border border-teal-500/30 bg-teal-100/40 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Why trust this result</h2>
        <p className="mt-2 text-sm text-navy-800">
          Every eligibility rule shown here reflects each program&rsquo;s actual UGC-DEB-mandated admission criteria -
          the same criteria that govern degree validity.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">Frequently asked questions</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <RelatedTools excludeHref={PATH} />

      <CTASection heading="You've done the research." subheading="Now check if you can apply - right now." primaryLabel="Check My Eligibility" primaryHref="#top" />
    </div>
  );
}
