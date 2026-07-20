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
import SalaryCurveChart from '@/components/SalaryCurveChart';
import { calculateRoi, RoiResult, WORK_MODES } from '@/tools/roiCalculator';
import { PROGRAMS } from '@/config/programs';
import { WorkMode } from '@/types';
import { trackEvent } from '@/lib/analytics';

type Stage = 'form' | 'loading' | 'teaser' | 'gated_form' | 'full' | 'error';

const PROGRAM_OPTIONS = PROGRAMS.map((p) => ({ value: p.slug, label: p.name }));

export default function CareerRoiCalculatorApp() {
  const [stage, setStage] = useState<Stage>('form');
  const [isFresher, setIsFresher] = useState(false);
  const [currentSalary, setCurrentSalary] = useState(600000);
  const [experienceYears, setExperienceYears] = useState(2);
  const [programSlug, setProgramSlug] = useState(PROGRAM_OPTIONS[0]?.value ?? '');
  const [workMode, setWorkMode] = useState<WorkMode>('metro');
  const [result, setResult] = useState<RoiResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('tool_page_viewed', { tool: 'career-roi-calculator' });
  }, []);

  function handleCalculate() {
    if (!programSlug) {
      setFormError('Choose a target program.');
      return;
    }
    if (!isFresher && (currentSalary < 0 || currentSalary > 100_000_000)) {
      setFormError('Enter a realistic current salary.');
      return;
    }
    setFormError(null);
    setStage('loading');
    trackEvent('tool_started', { tool: 'career-roi-calculator' });
    window.setTimeout(() => {
      const r = calculateRoi({
        isFresher,
        currentAnnualSalaryInr: isFresher ? 0 : currentSalary,
        experienceYears,
        programSlug,
        workMode
      });
      if (!r) {
        setStage('error');
        return;
      }
      setResult(r);
      setStage('teaser');
      trackEvent('calculation_completed', { tool: 'career-roi-calculator' });
      trackEvent('result_viewed', { tool: 'career-roi-calculator' });
    }, 500);
  }

  function reset() {
    setStage('form');
    setResult(null);
  }

  const userInputsSummary = `Fresher: ${isFresher}; Current salary: ${isFresher ? 'N/A' : currentSalary}; Experience: ${experienceYears}yrs; Program: ${programSlug}; Work mode: ${workMode}`;
  const resultSummary = result
    ? `Break-even: ${result.breakEvenMonth ? `Month ${result.breakEvenMonth}` : 'Beyond 5 years'}; Program: ${result.program.name}`
    : '';

  if (stage === 'error') return <ErrorMessage message="We couldn't run that calculation. Please check your inputs and try again." onRetry={reset} />;
  if (stage === 'loading') return <LoadingState label="Benchmarking your projection against industry salary data…" />;

  if (stage === 'teaser' && result) {
    return (
      <div className="space-y-6">
        <ResultCard title={`${result.program.name}: your break-even point`} accent="amber">
          <p className="font-mono text-5xl font-bold text-navy-900">
            {result.breakEvenMonth ? `Month ${result.breakEvenMonth}` : '5+ yrs'}
          </p>
          <p className="mt-2 text-sm text-navy-700/80">
            {result.breakEvenMonth
              ? "That's when your extra salary from this program covers what you paid for it."
              : "This program's payback extends beyond 5 years at your current inputs - the full report shows why and suggests adjustments."}
          </p>
        </ResultCard>
        <button onClick={() => setStage('gated_form')} className="w-full rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-600 sm:w-auto">
          Show My Full 5-Year Projection
        </button>
      </div>
    );
  }

  if (stage === 'gated_form') {
    return <LeadForm toolUsed="career-roi-calculator" userInputsSummary={userInputsSummary} resultSummary={resultSummary} onSuccess={() => setStage('full')} />;
  }

  if (stage === 'full' && result) {
    return (
      <div className="space-y-6">
        <ResultCard title="Your 5-year salary curve" accent="amber">
          <SalaryCurveChart data={result.fiveYearCurve} />
          <p className="mt-2 font-mono text-xs text-navy-700/60">
            Source: India Skills Report 2025 employability benchmarks (placeholder figures - see program data notes).
          </p>
        </ResultCard>
        <ResultCard title="Fee vs. EMI vs. gain" accent="teal">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-navy-700/10"><td className="py-1.5 text-navy-700/70">Program fee</td><td className="py-1.5 text-right font-mono">₹{result.feeInr.toLocaleString('en-IN')}</td></tr>
              <tr className="border-b border-navy-700/10"><td className="py-1.5 text-navy-700/70">Illustrative 12-month EMI</td><td className="py-1.5 text-right font-mono">₹{result.emiEstimateInr.toLocaleString('en-IN')}/mo</td></tr>
              <tr><td className="py-1.5 text-navy-700/70">Monthly salary gain after completion</td><td className="py-1.5 text-right font-mono">₹{result.monthlyGainAfterCompletion.toLocaleString('en-IN')}/mo</td></tr>
            </tbody>
          </table>
        </ResultCard>
        <p className="text-xs text-navy-700/60">
          No calculator can guarantee an individual salary outcome. These are data-backed projections meant to inform your decision, not promise a number.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <ShareButton toolSlug="career-roi-calculator" title="My Career ROI Result" text={`My break-even point for ${result.program.name}: ${result.breakEvenMonth ? 'Month ' + result.breakEvenMonth : '5+ years'}`} />
          <button onClick={reset} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">Calculate again</button>
          <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '')}`} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
            Get an EMI Plan for This Program
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-navy-700/10 bg-white p-6">
      <FormField label="Are you currently a fresher (no salary yet)?" htmlFor="isFresher">
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="radio" checked={isFresher} onChange={() => setIsFresher(true)} /> Yes, fresher</label>
          <label className="flex items-center gap-2"><input type="radio" checked={!isFresher} onChange={() => setIsFresher(false)} /> No, I&apos;m working</label>
        </div>
      </FormField>
      {!isFresher && (
        <FormField label="Current annual salary (₹)" htmlFor="currentSalary" required error={formError || undefined}>
          <NumberInput id="currentSalary" min={0} step={10000} value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))} />
        </FormField>
      )}
      <FormField label="Years of work experience" htmlFor="experienceYears" required>
        <NumberInput id="experienceYears" min={0} max={40} value={experienceYears} onChange={(e) => setExperienceYears(Number(e.target.value))} />
      </FormField>
      <FormField label="Target program" htmlFor="programSlug" required error={isFresher ? formError || undefined : undefined}>
        <SelectField id="programSlug" options={PROGRAM_OPTIONS} value={programSlug} onChange={(e) => setProgramSlug(e.target.value)} />
      </FormField>
      <FormField label="City / mode of work" htmlFor="workMode" required>
        <SelectField id="workMode" options={WORK_MODES} value={workMode} onChange={(e) => setWorkMode(e.target.value as WorkMode)} />
      </FormField>
      <button onClick={handleCalculate} className="mt-2 w-full rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-600 sm:w-auto">
        Calculate My Career ROI
      </button>
    </div>
  );
}
