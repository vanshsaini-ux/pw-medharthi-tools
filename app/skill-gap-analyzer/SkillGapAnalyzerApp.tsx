'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import TextInput from '@/components/TextInput';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import ResultCard from '@/components/ResultCard';
import ScoreDial from '@/components/ScoreDial';
import ShareButton from '@/components/ShareButton';
import LeadForm from '@/components/LeadForm';
import { analyzeSkillGap, SkillGapResult } from '@/tools/skillGapAnalyzer';
import { ALL_ROLES } from '@/config/skillMaps';
import { extractTextFromFile, ACCEPTED_RESUME_EXTENSIONS, MAX_RESUME_FILE_SIZE_BYTES } from '@/lib/resumeParser';
import { trackEvent } from '@/lib/analytics';

type Stage = 'form' | 'loading' | 'teaser' | 'gated_form' | 'full' | 'error';

const ROLE_OPTIONS = ALL_ROLES.map((r) => ({ value: r, label: r }));

export default function SkillGapAnalyzerApp() {
  const [stage, setStage] = useState<Stage>('form');
  const [resumeText, setResumeText] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [targetRole, setTargetRole] = useState(ROLE_OPTIONS[0]?.value ?? '');
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  useEffect(() => {
    trackEvent('tool_page_viewed', { tool: 'skill-gap-analyzer' });
  }, []);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileError(null);
    if (file.size > MAX_RESUME_FILE_SIZE_BYTES) {
      setFileError('File is too large (max 5MB). Try pasting your resume text instead.');
      return;
    }
    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (err) {
      setFileError(err instanceof Error ? err.message : 'Could not read that file. Try pasting your resume text instead.');
    }
  }

  function handleAnalyze() {
    if (resumeText.trim().length < 30 && linkedinUrl.trim().length === 0) {
      setFormError('Upload/paste your resume, or add your LinkedIn profile URL.');
      return;
    }
    setFormError(null);
    setStage('loading');
    trackEvent('tool_started', { tool: 'skill-gap-analyzer' });
    window.setTimeout(() => {
      const textToAnalyze = resumeText || linkedinUrl; // LinkedIn URL alone still lets the tool run on whatever text was captured
      const r = analyzeSkillGap(textToAnalyze, targetRole);
      if (!r) {
        setStage('error');
        return;
      }
      setResult(r);
      setStage('teaser');
      trackEvent('calculation_completed', { tool: 'skill-gap-analyzer' });
      trackEvent('result_viewed', { tool: 'skill-gap-analyzer' });
    }, 600);
  }

  function reset() {
    setStage('form');
    setResumeText('');
    setLinkedinUrl('');
    setResult(null);
  }

  const userInputsSummary = `Target role: ${targetRole}; Resume length: ${resumeText.length} chars; LinkedIn: ${linkedinUrl || 'N/A'}`;
  const resultSummary = result ? `${result.readinessPercent}% ready for ${result.role}` : '';

  if (stage === 'error') return <ErrorMessage message="We couldn't analyze that. Please try a different resume file or paste the text directly." onRetry={reset} />;
  if (stage === 'loading') return <LoadingState label="Comparing your skills against real job requirements…" />;

  if (stage === 'teaser' && result) {
    return (
      <div className="space-y-6">
        <ResultCard title="Your Job-Readiness Score" accent="amber">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <ScoreDial percent={result.readinessPercent} label={result.role} sublabel="ready" />
            <p className="flex-1 text-center text-navy-800 sm:text-left">{result.headlineGap}</p>
          </div>
        </ResultCard>
        <button onClick={() => setStage('gated_form')} className="w-full rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-600 sm:w-auto">
          Unlock My Full Skill Gap Report
        </button>
      </div>
    );
  }

  if (stage === 'gated_form') {
    return <LeadForm toolUsed="skill-gap-analyzer" userInputsSummary={userInputsSummary} resultSummary={resultSummary} onSuccess={() => setStage('full')} />;
  }

  if (stage === 'full' && result) {
    return (
      <div className="space-y-6">
        <ResultCard title="Skills you already have" accent="teal">
          <ul className="space-y-1 text-sm">
            {result.matchedSkills.length === 0 && <li className="text-navy-700/60">No listed skills matched yet - add tools/technologies explicitly to your resume.</li>}
            {result.matchedSkills.map((s) => (
              <li key={s.skill} className="flex justify-between border-b border-navy-700/10 py-1.5 last:border-0">
                <span>✅ {s.skill}</span>
              </li>
            ))}
          </ul>
        </ResultCard>
        <ResultCard title="Skills to close the gap" accent="coral">
          <ul className="space-y-2 text-sm">
            {result.missingSkills.map((s) => (
              <li key={s.skill} className="border-b border-navy-700/10 pb-2 last:border-0">
                <p className="font-medium">{s.skill}</p>
                <p className="text-navy-700/70">Covered in: {s.courseModule}</p>
              </li>
            ))}
            {result.missingSkills.length === 0 && <li className="text-navy-700/60">No major gaps detected for this role.</li>}
          </ul>
        </ResultCard>
        <div className="flex flex-wrap items-center gap-3">
          <ShareButton toolSlug="skill-gap-analyzer" title="My Job-Readiness Score" text={`I'm ${result.readinessPercent}% ready for a ${result.role} role`} />
          <button onClick={reset} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">Analyze again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-navy-700/10 bg-white p-6">
      <FormField label="Upload your resume (PDF/DOCX/TXT)" htmlFor="resumeFile" error={fileError || undefined}>
        <input id="resumeFile" type="file" accept={ACCEPTED_RESUME_EXTENSIONS} onChange={handleFileChange} className="block w-full text-sm text-navy-700" />
      </FormField>
      <FormField label="…or paste your resume text" htmlFor="resumeText" hint="Most accurate when tools/technologies are explicitly listed">
        <textarea
          id="resumeText"
          rows={6}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="w-full rounded-lg border border-navy-700/20 bg-white px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        />
      </FormField>
      <FormField label="…or your LinkedIn profile URL" htmlFor="linkedinUrl" hint="Optional alternative to a resume" error={formError || undefined}>
        <TextInput id="linkedinUrl" placeholder="https://linkedin.com/in/…" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
      </FormField>
      <FormField label="Target job role" htmlFor="targetRole" required>
        <SelectField id="targetRole" options={ROLE_OPTIONS} value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
      </FormField>
      <button onClick={handleAnalyze} className="mt-2 w-full rounded-lg bg-amber-500 px-6 py-3 font-semibold text-navy-950 hover:bg-amber-600 sm:w-auto">
        Check My Job-Readiness Score
      </button>
    </div>
  );
}
