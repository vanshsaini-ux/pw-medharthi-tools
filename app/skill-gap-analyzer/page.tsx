import type { Metadata } from 'next';
import SkillGapAnalyzerApp from './SkillGapAnalyzerApp';
import FAQAccordion from '@/components/FAQAccordion';
import RelatedTools from '@/components/RelatedTools';
import CTASection from '@/components/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.pwmedharthi.com';
const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || 'PW Medharthi';
const PATH = '/skill-gap-analyzer';

export const metadata: Metadata = {
  title: 'Skill Gap Analyzer | Am I Job-Ready? Free AI Resume Check',
  description: `Upload your resume or LinkedIn profile and see exactly which skills are missing for your target role - mapped to the ${BRAND} course that closes the gap.`,
  alternates: { canonical: PATH },
  openGraph: { title: 'Skill Gap Analyzer', description: 'Find out if you are job-ready in 90 seconds.', url: `${SITE_URL}${PATH}`, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Skill Gap Analyzer' }
};

const FAQ_ITEMS = [
  { question: 'Is my resume data stored or shared?', answer: 'Your resume is processed to generate your score and is not shared with third parties. You control whether to share contact details for the full report.' },
  { question: "What if I don't have a LinkedIn profile?", answer: 'A resume upload works just as well - the tool accepts either.' },
  { question: 'How accurate is the skill extraction?', answer: "The AI reads stated skills, tools, and experience descriptions from your resume/profile. It's most accurate when your resume explicitly lists tools and technologies, not just job titles." },
  { question: 'What happens after I see my gaps?', answer: `Your report maps each missing skill to the specific ${BRAND} course or specialisation that teaches it, so you know exactly what closing the gap looks like.` }
];

export default function SkillGapAnalyzerPage() {
  const softwareAppLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: `${BRAND} Skill Gap Analyzer`, applicationCategory: 'EducationApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  const breadcrumbLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Career Intelligence', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Skill Gap Analyzer', item: `${SITE_URL}${PATH}` }] };

  return (
    <div className="space-y-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-amber-600">Layer 2 · Decision Support</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-bold text-navy-900 sm:text-5xl">Are You Actually Job-Ready? Find Out in 90 Seconds.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-navy-700/80">
          Upload your resume or paste your LinkedIn profile. Our AI compares it against real job requirements for
          your target role and shows you exactly what&rsquo;s missing.
        </p>
      </section>

      <section aria-label="Skill Gap Analyzer tool">
        <SkillGapAnalyzerApp />
      </section>

      <section className="rounded-xl2 border border-teal-500/30 bg-teal-100/40 p-6">
        <h2 className="font-display text-lg font-semibold text-navy-900">Why trust this result</h2>
        <p className="mt-2 text-sm text-navy-800">
          Skill maps are built from real job-role data - the same category of skill-matching technology used by
          enterprise platforms, built here for individual learners.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">Frequently asked questions</h2>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>

      <RelatedTools excludeHref={PATH} />

      <CTASection heading="Stop applying blind." subheading="Know exactly where you stand." primaryLabel="Check My Score" primaryHref="#top" />
    </div>
  );
}
