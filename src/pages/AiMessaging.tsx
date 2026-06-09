import { useState } from 'react';
import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

const TONES = ['Empowering', 'Technical', 'Approachable', 'Professional'] as const;
type Tone = typeof TONES[number];

// Explicit overrides take precedence over the inferred tone
const TONE_OVERRIDES: Partial<Record<string, Tone>> = {
  imovie: 'Approachable',
};

function inferTone(msg: string): Tone {
  const lower = msg.toLowerCase();
  if (lower.includes('empower') || lower.includes('creator') || lower.includes('everyone')) return 'Empowering';
  if (lower.includes('precision') || lower.includes('model') || lower.includes('alpha')) return 'Technical';
  if (lower.includes('fun') || lower.includes('express') || lower.includes('magic')) return 'Approachable';
  return 'Professional';
}

const TONE_COLORS: Record<Tone, string> = {
  Empowering: '#14B8A6',
  Technical: '#06B6D4',
  Approachable: '#A78BFA',
  Professional: '#EC4899',
};

// How each competitor names and markets their AI credits / usage units

export function AiMessaging() {
  const { activeCategories } = useFilter();
  const filtered = competitors.filter(c => activeCategories.includes(c.category));
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>AI Messaging</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        How each competitor communicates their AI capabilities.
      </p>
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
          borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a',
          color: '#A0A0A0', fontSize: 10, fontWeight: 500,
        }}>
          Slide 8 · GenAI Competitive Landscape Assessment, May 2026
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(c => {
          const tone = TONE_OVERRIDES[c.id] ?? inferTone(c.genAiMessaging);
          const heroTagline = c.genAiMessaging.split('.')[0] + '.';
          const restOfMessage = c.genAiMessaging.slice(heroTagline.length).trim();
          const isExpanded = expanded[c.id];

          return (
            <Card key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                  <CategoryBadge category={c.category} />
                </div>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: TONE_COLORS[tone],
                    background: `${TONE_COLORS[tone]}18`,
                  }}
                >
                  {tone}
                </span>
              </div>

              <div className="section-label" style={{ marginBottom: 4 }}>Hero Tagline</div>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, marginBottom: 12, lineHeight: 1.5 }}>
                {heroTagline}
              </p>

              {restOfMessage && (
                <>
                  <div className="section-label" style={{ marginBottom: 4 }}>Full Messaging</div>
                  <p style={{ color: '#A0A0A0', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                    {isExpanded ? restOfMessage : restOfMessage.slice(0, 120) + (restOfMessage.length > 120 ? '…' : '')}
                  </p>
                  {restOfMessage.length > 120 && (
                    <button
                      onClick={() => toggle(c.id)}
                      style={{ color: '#EB1000', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, padding: '4px 0', marginTop: 4 }}
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </>
              )}
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #2a2a2a' }}>
                <span style={{
                  display: 'inline-flex', padding: '2px 8px', borderRadius: 3,
                  background: '#1e1e1e', border: '1px solid #3a3a3a',
                  color: '#555', fontSize: 10, fontWeight: 500,
                }}>
                  Slide 8 · GenAI Competitive Landscape Assessment
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
