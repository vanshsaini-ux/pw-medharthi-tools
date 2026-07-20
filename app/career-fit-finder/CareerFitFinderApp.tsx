'use client';

import { useEffect, useState } from 'react';
import StepIndicator from '@/components/StepIndicator';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import NumberInput from '@/components/NumberInput';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import ResultCard from '@/components/ResultCard';
import ScoreDial from '@/components/ScoreDial';
import ShareButton from '@/components/ShareButton';
import LeadForm from '@/components/LeadForm';
import { CAREER_GOALS, INTEREST_DOMAINS, findTopMatches, formatDomain, formatGoal, CareerFitInput, CareerFitMatch } from '@/tools/careerFitFinder';
import { CareerGoal, ExperienceBand, InterestDomain, StudyMode } from '@/types';
import { trackEvent } from '@/lib/analytics';

const EXPERIENCE_OPTIONS: { value: ExperienceBand; label: string }[] = [
  { value: '0', label: 'Fresher / 0 years' },
  { value: '1-3', label: '1–3 years' },
  { value: '3-6', label: '3–6 years' },
  { value: '6+', label: '6+ years' }
];

const STUDY_MODE_OPTIONS: { value: StudyMode; label: string }[] = [
  { value: 'weekend', label: 'Only weekends' },
  { value: 'daily_1hr', label: 'Daily, ~1 hour' },
  { value: 'flexible', label: 'Flexible' }
];

type Stage = 'form' | 'loading' | 'teaser' | 'gated_form' | 'full' | 'error';

export default function CareerFitFinderApp() {
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<Stage>('form');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState<ExperienceBand>('0');
  const [interests, setInterests] = useState<InterestDomain[]>([]);
  const [goal, setGoal] = useState<CareerGoal>('higher_salary');
  const [weeklyHours, setWeeklyHours] = useState(5);
  const [studyMode, setStudyMode] = useState<StudyMode>('flexible');
  const [matches, setMatches] = useState<CareerFitMatch[]>([]);
  const [stepError, setStepError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('tool_page_viewed', { tool: 'career-fit-finder' });
  }, []);

  function toggleInterest(domain: InterestDomain) {
    setInterests((prev) => (prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]));
  }

  function goNext() {
    if (step === 1 && qualification.trim().length === 0) {
      setStepError('Tell us your current qualification.');
      return;
    }
    if (step === 2 && interests.length === 0) {
      setStepError('Pick at least one interest area.');
      return;
    }
    setStepError(null);
    if (step < 3) {
      setStep(step + 1);
      trackEvent('form_step_completed', { tool: 'career-fit-finder', step });
    } else {
      runCalculation();
    }
  }

  function runCalculation() {
    setStage('loading');
    trackEvent('tool_started', { tool: 'career-fit-finder' });
    try {
      const input: CareerFitInput = { qualification, experience, interests, goal, weeklyHours, studyMode };
      window.setTimeout(() => {
        const top = findTopMatches(input, 3);
        if (top.length === 0) {
          setStage('error');
          return;
        }
        setMatches(top);
        setStage('teaser');
        trackEvent('calculation_completed', { tool: 'career-fit-finder' });
        trackEvent('result_viewed', { tool: 'career-fit-finder' });
      }, 500);
    } catch {
      setStage('error');
    }
  }

  function resetTool() {
    setStep(1);
    setStage('form');
    setQualification('');
    setExperience('0');
    setInterests([]);
    setGoal('higher_salary');
    setWeeklyHours(5);
    setStudyMode('flexible');
    setMatches([]);
  }

  const top = matches[0];

  const userInputsSummary = `Qualification: ${qualification}; Experience: ${experience}; Interests: ${interests
    .map(formatDomain)
    .join(', ')}; Goal: ${formatGoal(goal)}; Weekly hours: ${weeklyHours}; Study mode: ${studyMode}`;
  const resultSummary = matches.map((m, i) => `${i + 1}. ${m.program.name} (${m.matchPercent}%)`).join(' | ');

  if (stage === 'error') {
    return <ErrorMessage message="We couldn't calculate your match. Please check your answers and try again." onRetry={resetTool} />;
  }

  if (stage === 'loading') return <LoadingState label="Matching your profile against 18 programs…" />;

  if (stage === 'teaser' && top) {
    return (
      <div className="space-y-6">
        <ResultCard title="Your top match" accent="amber">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
            <ScoreDial percent={top.matchPercent} label={top.program.name} sublabel="match" />
            <div className="flex-1 text-center sm:text-left">
              <p className="text-navy-800">{top.reason}</p>
              <p className="mt-3 text-sm text-navy-700/70">
                Unlock your full report to see your top 3 matches, expected salary band, real job titles hiring for
                this match, and a downloadable PDF summary.
              </p>
            </div>
          </div>
        </ResultCard>
        <button
          onClick={() => setStage('gated_form')}
          className="btn-primary w-full sm:w-auto"
        >
          Get My Full Match Report
        </button>
      </div>
    );
  }

  if (stage === 'gated_form') {
    return (
      <LeadForm
        toolUsed="career-fit-finder"
        userInputsSummary={userInputsSummary}
        resultSummary={resultSummary}
        onSuccess={() => setStage('full')}
      />
    );
  }

  if (stage === 'full') {
    return (
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {matches.map((m, i) => (
            <ResultCard key={m.program.id} title={`#${i + 1} · ${m.program.name}`} accent={i === 0 ? 'amber' : 'teal'}>
              <ScoreDial percent={m.matchPercent} label="Match" accent={i === 0 ? 'amber' : 'teal'} />
              <p className="mt-3 text-sm">{m.reason}</p>
              <dl className="mt-3 space-y-1 font-mono text-xs text-navy-700/80">
                <div className="flex justify-between"><dt>Fee</dt><dd>₹{m.program.feeInr.toLocaleString('en-IN')}</dd></div>
                <div className="flex justify-between"><dt>Duration</dt><dd>{m.program.durationMonths} months</dd></div>
                <div className="flex justify-between"><dt>Starting salary</dt><dd>₹{m.program.avgStartingSalaryInr.toLocaleString('en-IN')}/yr</dd></div>
              </dl>
              <p className="mt-3 text-xs text-navy-700/70">Roles: {m.program.jobRoles.join(', ')}</p>
            </ResultCard>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ShareButton toolSlug="career-fit-finder" title="My Career-Fit Result" text={`My top match: ${top?.program.name} (${top?.matchPercent}% fit)`} />
          <button onClick={resetTool} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
            Retake the quiz
          </button>
          <a href={`https://wa.me/?text=${encodeURIComponent('I want to talk to a program counsellor about my Career-Fit result.')}`} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
            Talk to a Program Counsellor
          </a>
        </div>
      </div>
    );
  }

  // stage === 'form'
  return (
    <div className="rounded-xl2 border border-navy-700/10 bg-white p-6">
      <StepIndicator currentStep={step} totalSteps={3} stepLabels={['Your background', 'Interests & goal', 'Study preferences']} />

      {step === 1 && (
        <>
          <FormField label="Current qualification & year of completion" htmlFor="qualification" required error={stepError || undefined}>
            <input
              id="qualification"
              className="w-full rounded-lg border border-navy-700/20 bg-white px-3 py-2.5 text-base focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              placeholder="e.g. B.Com, 2022"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
          </FormField>
          <FormField label="Total work experience" htmlFor="experience" required>
            <SelectField id="experience" options={EXPERIENCE_OPTIONS} value={experience} onChange={(e) => setExperience(e.target.value as ExperienceBand)} />
          </FormField>
        </>
      )}

      {step === 2 && (
        <>
          <FormField label="Interest domains (choose all that apply)" htmlFor="interests" required error={stepError || undefined}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {INTEREST_DOMAINS.map((d) => (
                <label key={d.value} className="flex items-center gap-2 rounded-lg border border-navy-700/15 px-3 py-2 text-sm">
                  <input type="checkbox" checked={interests.includes(d.value)} onChange={() => toggleInterest(d.value)} className="h-4 w-4 rounded border-navy-700/30 text-amber-600 focus:ring-2 focus:ring-amber-500/40" />
                  {d.label}
                </label>
              ))}
            </div>
          </FormField>
          <FormField label="Career goal" htmlFor="goal" required>
            <SelectField id="goal" options={CAREER_GOALS} value={goal} onChange={(e) => setGoal(e.target.value as CareerGoal)} />
          </FormField>
        </>
      )}

      {step === 3 && (
        <>
          <FormField label="Weekly time available for study (hours)" htmlFor="weeklyHours" required>
            <NumberInput id="weeklyHours" min={1} max={40} value={weeklyHours} onChange={(e) => setWeeklyHours(Number(e.target.value))} />
          </FormField>
          <FormField label="Preferred mode" htmlFor="studyMode" required>
            <SelectField id="studyMode" options={STUDY_MODE_OPTIONS} value={studyMode} onChange={(e) => setStudyMode(e.target.value as StudyMode)} />
          </FormField>
        </>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
            Back
          </button>
        ) : <span />}
        <button onClick={goNext} className="btn-primary">
          {step < 3 ? 'Next' : 'Find My Best-Fit Degree'}
        </button>
      </div>
    </div>
  );
}
