'use client';

import { useEffect, useState } from 'react';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import NumberInput from '@/components/NumberInput';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import ResultCard from '@/components/ResultCard';
import ShareButton from '@/components/ShareButton';
import LeadForm from '@/components/LeadForm';
import { checkEligibility, EligibilityResult, EligibilityStatus, QUALIFICATION_LEVELS, CATEGORIES } from '@/tools/eligibilityChecker';
import { PROGRAMS } from '@/config/programs';
import { Category, QualificationLevel } from '@/types';
import { trackEvent } from '@/lib/analytics';

type Stage = 'form' | 'loading' | 'result' | 'apply_form' | 'applied' | 'error';

const PROGRAM_OPTIONS = [{ value: 'suggest_best_fit', label: 'Suggest the best fit for me' }, ...PROGRAMS.map((p) => ({ value: p.slug, label: p.name }))];

const STATUS_COPY: Record<EligibilityStatus, { label: string; accent: 'teal' | 'amber' | 'coral' }> = {
  eligible: { label: 'Eligible', accent: 'teal' },
  eligible_with_bridge: { label: 'Eligible with Bridge Course', accent: 'amber' },
  not_eligible: { label: 'Not Eligible', accent: 'coral' }
};

export default function EligibilityCheckerApp() {
  const [stage, setStage] = useState<Stage>('form');
  const [qualificationLevel, setQualificationLevel] = useState<QualificationLevel>('bachelor');
  const [percentage, setPercentage] = useState(60);
  const [category, setCategory] = useState<Category>('General');
  const [experienceYears, setExperienceYears] = useState(0);
  const [targetProgramSlug, setTargetProgramSlug] = useState('suggest_best_fit');
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('tool_page_viewed', { tool: 'eligibility-checker' });
  }, []);

  function handleCheck() {
    if (percentage < 0 || percentage > 100) {
      setFormError('Enter a percentage/CGPA-equivalent between 0 and 100.');
      return;
    }
    setFormError(null);
    setStage('loading');
    trackEvent('tool_started', { tool: 'eligibility-checker' });
    window.setTimeout(() => {
      const r = checkEligibility({ qualificationLevel, percentage, category, experienceYears, targetProgramSlug: targetProgramSlug as 'suggest_best_fit' | string });
      if (!r) {
        setStage('error');
        return;
      }
      setResults(Array.isArray(r) ? r : [r]);
      setStage('result');
      trackEvent('calculation_completed', { tool: 'eligibility-checker' });
      trackEvent('result_viewed', { tool: 'eligibility-checker' });
    }, 400);
  }

  function reset() {
    setStage('form');
    setResults([]);
  }

  const userInputsSummary = `Qualification: ${qualificationLevel}; %: ${percentage}; Category: ${category}; Experience: ${experienceYears}yrs; Target: ${targetProgramSlug}`;
  const resultSummary = results.map((r) => `${r.program.name}: ${r.status}`).join(' | ');

  if (stage === 'error') return <ErrorMessage message="We couldn't check eligibility for that combination. Please review your inputs." onRetry={reset} />;
  if (stage === 'loading') return <LoadingState label="Checking against UGC-DEB eligibility criteria…" />;

  if (stage === 'result' || stage === 'apply_form' || stage === 'applied') {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((r) => {
            const copy = STATUS_COPY[r.status];
            return (
              <ResultCard key={r.program.id} title={r.program.name} accent={copy.accent}>
                <p className="font-semibold text-navy-900">{copy.label}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-navy-700/80">
                  {r.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                  {r.reasons.length === 0 && <li>Meets all published eligibility criteria.</li>}
                </ul>
                {r.alternativePrograms.length > 0 && (
                  <div className="mt-3 border-t border-navy-700/10 pt-2">
                    <p className="text-xs font-medium text-navy-700/70">Better-fit alternatives:</p>
                    <ul className="mt-1 text-sm">
                      {r.alternativePrograms.map((alt) => <li key={alt.id}>{alt.name}</li>)}
                    </ul>
                  </div>
                )}
              </ResultCard>
            );
          })}
        </div>
        <p className="text-xs text-navy-700/60">
          Category affects fee and scholarship eligibility, not core admission eligibility, which is based on
          qualification and experience per UGC-DEB norms.
        </p>

        {stage === 'result' && (
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setStage('apply_form')} className="btn-primary">
              Apply Now
            </button>
            <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '')}`} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
              Talk to Admissions on WhatsApp
            </a>
            <ShareButton toolSlug="eligibility-checker" title="My Eligibility Result" text={`My eligibility result: ${resultSummary}`} />
            <button onClick={reset} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">Check again</button>
          </div>
        )}

        {stage === 'apply_form' && (
          <LeadForm
            toolUsed="eligibility-checker"
            userInputsSummary={userInputsSummary}
            resultSummary={resultSummary}
            requirePhone
            submitLabel="Reserve My Seat"
            onSuccess={() => setStage('applied')}
          />
        )}

        {stage === 'applied' && (
          <ResultCard title="You're on the list!" accent="teal">
            <p>A program counsellor will reach out shortly to help you complete your application.</p>
          </ResultCard>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-navy-700/10 bg-white p-6">
      <FormField label="Highest qualification" htmlFor="qualificationLevel" required>
        <SelectField id="qualificationLevel" options={QUALIFICATION_LEVELS} value={qualificationLevel} onChange={(e) => setQualificationLevel(e.target.value as QualificationLevel)} />
      </FormField>
      <FormField label="Percentage / CGPA-equivalent" htmlFor="percentage" required error={formError || undefined}>
        <NumberInput id="percentage" min={0} max={100} value={percentage} onChange={(e) => setPercentage(Number(e.target.value))} />
      </FormField>
      <FormField label="Category" htmlFor="category" required hint="Affects fee/scholarship eligibility only">
        <SelectField id="category" options={CATEGORIES} value={category} onChange={(e) => setCategory(e.target.value as Category)} />
      </FormField>
      <FormField label="Work experience (years)" htmlFor="experienceYears" required>
        <NumberInput id="experienceYears" min={0} max={40} value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} />
      </FormField>
      <FormField label="Target program" htmlFor="targetProgramSlug" required>
        <SelectField id="targetProgramSlug" options={PROGRAM_OPTIONS} value={targetProgramSlug} onChange={(e) => setTargetProgramSlug(e.target.value)} />
      </FormField>
      <button onClick={handleCheck} className="btn-primary mt-2 w-full sm:w-auto">
        Check My Eligibility Now
      </button>
    </div>
  );
}
