'use client';

import { useEffect, useState } from 'react';
import FormField from '@/components/FormField';
import SelectField from '@/components/SelectField';
import TextInput from '@/components/TextInput';
import LoadingState from '@/components/LoadingState';
import ErrorMessage from '@/components/ErrorMessage';
import RoadmapPath from '@/components/RoadmapPath';
import ShareButton from '@/components/ShareButton';
import LeadForm from '@/components/LeadForm';
import { TIMELINE_OPTIONS, RoadmapResult } from '@/tools/roadmapGenerator';
import { ALL_ROLES } from '@/config/skillMaps';
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
    const showAll = stage === 'full';

    return (
      <div className="space-y-6">
        {!roadmap.groundedInRole && (
          <p className="rounded-lg border border-amber-500/30 bg-amber-100/40 px-4 py-2.5 text-sm text-navy-800">
            We don&rsquo;t have a verified skill map for &ldquo;{roadmap.targetRole}&rdquo; yet, so this roadmap uses
            general milestones rather than course-matched ones. Try a role like Data Scientist, Business Analyst,
            Digital Marketing Manager, Financial Analyst, HR Analytics Lead or Generative AI Engineer for a fully
            matched plan.
          </p>
        )}

        <div className="card p-6 sm:p-8">
          <RoadmapPath roadmap={roadmap} showAll={showAll} onUnlock={() => setStage('gated_form')} />
        </div>

        {stage === 'gated_form' && (
          <LeadForm toolUsed="career-roadmap-generator" userInputsSummary={userInputsSummary} resultSummary={resultSummary} onSuccess={() => setStage('full')} />
        )}

        {showAll && (
          <div className="flex flex-wrap items-center gap-3">
            <ShareButton toolSlug="career-roadmap-generator" title="My Career Roadmap" text={`My ${timelineMonths}-month roadmap to becoming a ${roadmap.targetRole}`} />
            <button onClick={reset} className="btn-secondary">Build another roadmap</button>
            <a href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '')}`} className="btn-secondary">
              Get Milestone Reminders on WhatsApp
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-8">
      <FormField label="I want to become a ___" htmlFor="targetRole" required error={formError || undefined} hint={`Try: ${ALL_ROLES.slice(0, 3).join(', ')}...`}>
        <TextInput id="targetRole" placeholder="e.g. Data Scientist" list="role-suggestions" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} />
        <datalist id="role-suggestions">
          {ALL_ROLES.map((role) => (
            <option key={role} value={role} />
          ))}
        </datalist>
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
