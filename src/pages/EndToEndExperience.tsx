import { useState } from 'react';
import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { EditableField } from '../components/EditableField';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

const ADOBE_E2E_STUB = {
  id: 'adobe',
  name: 'Adobe CC (Students)',
  category: 'Professional Tools' as Category,
  experience: {
    frictionRating: 'High' as const,
    onboarding: 'Adobe account required; install Creative Cloud desktop app; individual app downloads (Photoshop ~4GB, Premiere ~6GB); steepest setup overhead among compared platforms — offset by extensive tutorials, YouTube community, and Behance ecosystem',
    certification: 'Adobe Certified Professional — programs for Photoshop, Illustrator, Premiere Pro, and more',
  },
};

const STAGES = ['Discover', 'Onboard', 'Create', 'Share/Export', 'Retain'];

// Stage notes sourced from:
//   Canva   — Slide 11 · GenAI Competitive Landscape Assessment, May 2026 + canva.com
//   ChatGPT — Slide 10 · GenAI Competitive Landscape Assessment, May 2026 + openai.com
//   CapCut  — Slide 14 · GenAI Competitive Landscape Assessment, May 2026 + capcut.com
const CARD_SOURCES: Record<string, string> = {
  canva:   'Slide 11 · GenAI Competitive Landscape Assessment, May 2026 · canva.com',
  chatgpt: 'Slide 10 · GenAI Competitive Landscape Assessment, May 2026 · openai.com',
  capcut:  'Slide 14 · GenAI Competitive Landscape Assessment, May 2026 · capcut.com',
  adobe:   'adobe.com/creativecloud/plans.html · helpx.adobe.com/creative-cloud',
};
const INITIAL_STAGE_NOTES: Record<string, Record<string, string>> = {
  canva: {
    Discover:
      '220M+ MAU gives Canva unmatched domain authority — template pages rank #1 across thousands of search queries; "Canva for Education" campus outreach; social sharing of Canva-made content',
    Onboard:
      'Instant signup via Google/email; template picker surfaces value immediately; AI tools accessible from left sidebar (Slide 11)',
    Create:
      'Drag-and-drop canvas; Magic Studio credits (50/mo free, 500/mo Pro); Magic Write, Magic Edit, Magic Eraser, Background Remover',
    'Share/Export':
      'One-click publish to social (Instagram, LinkedIn, etc.); PDF/PNG/MP4 download; shareable Canva link; Brand Kit on Pro',
    Retain:
      'Free credit limit (50/mo) nudges Pro upgrade; Canva for Education keeps students on platform free; credit pack upsell',
  },
  chatgpt: {
    Discover:
      '#1 named "best overall AI platform" by 36% of survey respondents (Q7 · GenAI Tracker n=137); dominant brand awareness drives organic growth',
    Onboard:
      'Email or Google signup; GPT-4o available immediately on free tier with no credit card; very easy onboarding (Slide 10)',
    Create:
      'Conversational interface; Canvas mode for structured writing/editing; GPT Image 2 for AI imagery (Apr 2026); code interpreter',
    'Share/Export':
      'Shareable conversation link; image download (PNG); copy to clipboard; ChatGPT Canvas allows document export',
    Retain:
      'Free-tier usage limits prompt Plus ($20/mo) upgrade; persistent conversation history; GPTs / custom assistants deepen stickiness',
  },
  capcut: {
    Discover:
      'TikTok ecosystem embedding; videos shared with CapCut branding drive app installs; app store top charts in video editing',
    Onboard:
      'No account required for basic edits; template-first start; TikTok login optional; 150 AI credits/wk on free tier (Slide 14)',
    Create:
      'Timeline editor; AI Remix, Auto Caption, Auto Removal, Motion Tracking (Slide 14); sky replacement; AI avatars (Pro)',
    'Share/Export':
      'Direct publish to TikTok, Instagram, YouTube; 1080p local download free; 4K and watermark removal require Pro',
    Retain:
      'CapCut watermark on exports creates viral loop; AI credit limits (150/wk) and watermark-free export drive Pro ($7.99/mo) upgrade',
  },
  adobe: {
    Discover:
      'Industry-standard status drives aspirational pull — students enter creative fields expecting to learn CC; Behance portfolio community; campus/university partnerships; "Adobe for Education" outreach; brand synonymous with professional creative work',
    Onboard:
      'Adobe account creation required; install Creative Cloud desktop app (~800MB); individual app downloads 2–6GB each (Photoshop, Premiere, Illustrator); first-launch tutorials built in; Firefly AI accessible from within apps immediately — no separate setup',
    Create:
      '4,000 Generative Credits/mo power Firefly across the suite: Generative Fill + Expand (Photoshop); Text to Image, Generative Recolor, Text to Vector (Illustrator/Firefly); AI speech cleanup + auto-reframe (Premiere); credits shared across all apps in the subscription',
    'Share/Export':
      'Export to all professional formats (PDF, PNG, SVG, EPS, MP4, etc.); Behance publish directly from apps; Creative Cloud Libraries sync assets across devices; Adobe Portfolio for student showcase sites; Share for Review collaboration',
    Retain:
      'Industry-standard file format lock-in (.psd, .ai, .prproj); Behance portfolio social graph; certification programs; CC intro price increase yr 2 ($19.99→$39.99/mo) raises switching cost; integration across suite (assets, libraries, fonts) deepens dependency',
  },
};

export function EndToEndExperience() {
  const { activeCategories } = useFilter();
  const PRIORITY_ORDER = ['canva', 'capcut', 'chatgpt'];
  const filtered = [
    ...(activeCategories.includes('Professional Tools') ? [ADOBE_E2E_STUB as typeof competitors[0]] : []),
    ...competitors.filter(c => activeCategories.includes(c.category)),
  ].sort((a, b) => {
    const ai = PRIORITY_ORDER.indexOf(a.id);
    const bi = PRIORITY_ORDER.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });
  const [stageNotes, setStageNotes] = useState<Record<string, Record<string, string>>>(INITIAL_STAGE_NOTES);

  function setNote(competitorId: string, stage: string, val: string) {
    setStageNotes(prev => ({
      ...prev,
      [competitorId]: { ...(prev[competitorId] || {}), [stage]: val },
    }));
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>End-to-End Experience</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        Per-competitor journey mapping across 5 stages. Stage notes are editable — click any cell to update.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        {[
          'Canva journey · Slide 11 · GenAI Competitive Landscape Assessment, May 2026',
          'ChatGPT journey · Slide 10 · GenAI Competitive Landscape Assessment, May 2026',
          'CapCut journey · Slide 14 · GenAI Competitive Landscape Assessment, May 2026',
        ].map(s => (
          <span key={s} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#A0A0A0', fontSize: 10, fontWeight: 500 }}>
            {s}
          </span>
        ))}
      </div>
      <p style={{ color: '#555', fontSize: 11, marginBottom: 24, fontStyle: 'italic' }}>
        Canva, ChatGPT, and CapCut are pre-populated from deck slides + platform docs. Other platforms are blank — add notes as needed.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {filtered.map(c => {
          const hasSourcedNotes = !!INITIAL_STAGE_NOTES[c.id];
          return (
            <Card key={c.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                <CategoryBadge category={c.category} />
                {hasSourcedNotes && (
                  <span style={{ fontSize: 10, color: '#14B8A6', background: '#14B8A618', border: '1px solid #14B8A640', borderRadius: 3, padding: '1px 6px', fontWeight: 500 }}>
                    Sourced
                  </span>
                )}
              </div>

              {/* Pipeline */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${STAGES.length}, 1fr)`,
                  gap: 0,
                  marginBottom: 16,
                  border: '1px solid #333',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                {STAGES.map((stage, i) => (
                  <div
                    key={stage}
                    style={{
                      padding: 12,
                      borderRight: i < STAGES.length - 1 ? '1px solid #333' : 'none',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#EB1000',
                        marginBottom: 6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {stage}
                      {i < STAGES.length - 1 && (
                        <span style={{ color: '#444', marginLeft: 'auto' }}>→</span>
                      )}
                    </div>
                    <EditableField
                      value={stageNotes[c.id]?.[stage] || ''}
                      onChange={val => setNote(c.id, stage, val)}
                      multiline
                      placeholder="Add notes…"
                      style={{ fontSize: 12, color: '#A0A0A0', lineHeight: '1.4' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div className="section-label" style={{ marginBottom: 4 }}>Onboarding</div>
                  <p style={{ color: '#A0A0A0', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{c.experience.onboarding}</p>
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: 4 }}>Certification</div>
                  <p style={{ color: '#A0A0A0', fontSize: 12, margin: 0 }}>
                    {c.experience.certification
                      ? (typeof c.experience.certification === 'string' ? c.experience.certification : 'Available')
                      : 'No certification program'}
                  </p>
                </div>
              </div>
              {CARD_SOURCES[c.id] && (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #2a2a2a' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#555', fontSize: 10, fontWeight: 500 }}>
                    {CARD_SOURCES[c.id]}
                  </span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
