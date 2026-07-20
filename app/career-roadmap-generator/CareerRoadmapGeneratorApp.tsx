'use client';

import { useEffect, useState } from 'react';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import TextInput from '@/components/TextInput';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import ResultCard from '@/components/ResultCard';
import ShareButton from '@/components/ShareButton';
import LeadForm from '@/components/LeadForm';
import { TIMELINE_OPTIONS, RoadmapResult } from '@/tools/roadmapGenerator';
import { trackEvent } from '@/lib/analytics';

type Stage = 'form' | 'loading' | 'preview' | 'gated_form' | 'full' | 'error';

export default function CareerRoadmapGeneratorApp() {
  const [stage, setStage] = useState<Stage>('form');
  const [targetRole, setTargetRole] = useState('');
  const [background, setBackground] = useState('');
  const [timelineMonths, setTimelineMonths] = useState<6 | 12 | 18>(12);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('tool_page_viewed', { tool: 'career-roadmap-generator' });
  }, []);

  async function handleGenerate() {
    if (targetRole.trim().length < 2) {
      setFormError('Tell us the role you want to become.');
      return;
    }
    setFormError(null);
    setStage('loading');
    trackEvent('tool_started', { tool: 'career-roadmap-generator' });
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRole, background, timelineMonths })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStage('error');
        return;
      }
      setRoadmap(data.roadmap as RoadmapResult);
      setStage('preview');
      trackEvent('calculation_completed', { tool: 'career-roadmap-generator' });
      trackEvent('result_viewed', { tool: 'career-roadmap-generator' });
    } catch {
      setStage('error');
    }
  }

  function reset() {
    setStage('form');
    setRoadmap(null);
    setTargetRole('');
    setBackground('');
  }

  const userInputsSummary = `Target role: ${targetRole}; Background: ${background}; Timeline: ${timelineMonths} months`;
  const resultSummary = roadmap ? `${roadmap.milestones.length}-milestone roadmap toward ${roadmap.targetRole}` : '';

  if (stage === 'error') return <ErrorMessage message="We couldn't build your roadmap. Please try again." onRetry={reset} />;
  if (stage === 'loading') return <LoadingState label="Building your milestone-by-milestone roadmap…" />;

  if ((stage === 'preview' || stage === 'gated_form' || stage === 'full') && roadmap) {
    const previewMilestones = roadmap.milestones.slice(0, 1);
    const remainingMilestones = roadmap.milestones.slice(1);
    const showAll = stage === 'full';

    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {previewMilestones.map((m) => (
            <MilestoneCard key={m.monthRangeLabel} milestone={m} />
          ))}
          {showAll
            ? remainingMilestones.map((m) => <MilestoneCard key={m.monthRangeLabel} milestone={m} />)
            : remainingMilestones.length > 0 && (
                <div className="rounded-xl2 border border-dashed border-navy-700/30 bg-navy-50 p-6 text-center">
                  <p className="font-medium text-navy-900">{remainingMilestones.length} more milestones, locked</p>
                  <p className="mt-1 text-sm text-navy-700/70">Unlock your full roadmap as a downloadable, shareable plan.</p>
                  <button onClick={() => setStage('gated_form')} className="btn-primary mt-3">
                    Unlock My Full Roadmap
                  </button>
                </div>
              )}
        </div>

        {stage === 'gated_form' && (
          <LeadForm toolUsed="career-roadmap-generator" userInputsSummary={userInputsSummary} resultSummary={resultSummary} onSuccess={() => setStage('full')} />
        )}

        {showAll && (
          <div className="flex flex-wrap items-center gap-3">
            <ShareButton toolSlug="career-roadmap-generator" title="My Career Roadmap" text={`My ${timelineMonths}-month roadmap to becoming a ${roadmap.targetRole}`} />
            <button onClick={reset} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">Build another roadmap</button>
            <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '')}`} className="rounded-lg border border-navy-700/20 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50">
              Get Milestone Reminders on WhatsApp
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-navy-700/10 bg-white p-6">
      <FormField label="I want to become a ___" htmlFor="targetRole" required error={formError || undefined}>
        <TextInput id="targetRole" placeholder="e.g. Data Scientist" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
      </FormField>
      <FormField label="Your current background" htmlFor="background" hint="One line - education + experience">
        <TextInput id="background" placeholder="e.g. B.Com graduate, 1 year in sales" value={background} onChange={(e) => setBackground(e.target.value)} />
      </FormField>
      <FormField label="Target timeline" htmlFor="timeline" required>
        <SelectField id="timeline" options={TIMELINE_OPTIONS.map((t) => ({ value: String(t.value), label: t.label }))} value={String(timelineMonths)} onChange={(e) => setTimelineMonths(Number(e.target.value) as 6 | 12 | 18)} />
      </FormField>
      <button onClick={handleGenerate} className="btn-primary mt-2 w-full sm:w-auto">
        Build My Career Roadmap
      </button>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: RoadmapResult['milestones'][number] }) {
  return (
    <ResultCard title={`${milestone.monthRangeLabel} · ${milestone.focus}`} accent="amber">
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {milestone.activities.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      {milestone.matchedProgramName && (
        <p className="mt-2 text-xs font-medium text-teal-500">Covered in: {milestone.matchedProgramName} — {milestone.matchedCourseModule}</p>
      )}
    </ResultCard>
  );
}
