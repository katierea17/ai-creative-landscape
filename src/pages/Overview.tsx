import { useState } from 'react';
import { Card } from '../components/Card';
import { EditableField } from '../components/EditableField';
import { CategoryBadge } from '../components/CategoryBadge';
import { categoryColors } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { keyDevelopments } from '../data/competitorData';
import type { KeyDevelopment } from '../data/competitorData';
import { ExternalLink } from 'lucide-react';

interface SummaryCard {
  label: string;
  color: string;
  insight: string;
  changed: string;
  sources: { label: string; url?: string }[];
}

const INITIAL_CARDS: SummaryCard[] = [
  {
    label: 'PRICING',
    color: '#EB1000',
    insight: "• Apple Creator Studio at $2.99/mo bundles 6 pro apps (FCP, Logic Pro, Pixelmator Pro+) — resets the student benchmark\n• Mass-market AI (ChatGPT, Gemini, Claude) all at $20/mo\n• Adobe Premiere (21%) and Photoshop (20%) top the 'too expensive for AI' list — Canva flagged by just 7%",
    changed: 'Q2 2026',
    sources: [
      { label: 'Slide 7 · GenAI Competitive Landscape Assessment' },
      { label: 'Q9 · GenAI Tracker n=137' },
    ],
  },
  {
    label: 'MESSAGING',
    color: '#06B6D4',
    insight: "• Most platforms frame AI as democratizing creativity — ChatGPT and Gemini are the only two leading with study and academic productivity messaging\n• Only Canva, Figma, FCP, and Runway pair student messaging with real pricing — Canva and Figma go free; FCP bundles 6 apps at $2.99/mo\n• Only 4 of 14 platforms actively target students — Claude and CapCut have no student-specific messaging",
    changed: 'Q2 2026',
    sources: [
      { label: 'Q8 · GenAI Tracker n=137' },
      { label: 'Slide 9 · GenAI Competitive Landscape Assessment' },
    ],
  },
  {
    label: 'SENTIMENT',
    color: '#EC4899',
    insight: "• ChatGPT leads at 36%; Adobe and Canva tied at 15% each\n• Gemini 9%, CapCut 7%, Claude 6%\n• No platform commands a majority — 64% prefer someone other than ChatGPT",
    changed: 'Q2 2026',
    sources: [
      { label: 'Q7 · GenAI Tracker n=137' },
    ],
  },
  {
    label: 'MARKETING MIX',
    color: '#7C3AED',
    insight: "• Pricing — Apple Creator Studio at $2.99/mo resets the student benchmark (Jan 28)\n• Product — Claude Design (Apr 17), GPT Image 2 (Apr 21), Nano Banana 2 (Mar 19); Sora discontinued\n• Promotion — Mass-market AI runs Super Bowl ads (Feb 8)\n• Partnerships — Claude integrates natively with Affinity + Adobe",
    changed: 'Q2 2026',
    sources: [
      { label: 'Slide 3 · GenAI Competitive Landscape Assessment' },
    ],
  },
];

function SourceChip({ label, url }: { label: string; url?: string }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 8px',
          borderRadius: 3,
          background: '#1e1e1e',
          border: '1px solid #3a3a3a',
          color: '#06B6D4',
          fontSize: 10,
          fontWeight: 500,
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <ExternalLink size={9} />
        {label}
      </a>
    );
  }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      borderRadius: 3,
      background: '#1e1e1e',
      border: '1px solid #3a3a3a',
      color: '#A0A0A0',
      fontSize: 10,
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}

function groupByMonth(devs: KeyDevelopment[]) {
  const map = new Map<string, KeyDevelopment[]>();
  for (const d of devs) {
    const key = d.date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
}

function formatMonth(ym: string) {
  const [y, m] = ym.split('-');
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDay(date: string) {
  const d = new Date(date + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function Overview() {
  const { activeCategories } = useFilter();
  const [cards, setCards] = useState<SummaryCard[]>(INITIAL_CARDS);

  const filtered = keyDevelopments
    .filter(d => activeCategories.includes(d.category))
    .sort((a, b) => b.date.localeCompare(a.date));

  const grouped = groupByMonth(filtered);

  function updateInsight(i: number, val: string) {
    setCards(prev => prev.map((c, j) => j === i ? { ...c, insight: val } : c));
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Overview</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 24 }}>
        Key insights across pricing, messaging, sentiment, and strategic shifts.
      </p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
        {cards.map((card, i) => (
          <Card key={card.label} accentColor={card.color}>
            <div className="section-label" style={{ marginBottom: 8 }}>{card.label}</div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-line' }}>
              <EditableField
                value={card.insight}
                onChange={val => updateInsight(i, val)}
                multiline
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, color: '#555', background: '#2e2e2e', padding: '2px 8px', borderRadius: 3 }}>
                {card.changed}
              </span>
              {card.sources.map((s, si) => (
                <SourceChip key={si} label={s.label} url={s.url} />
              ))}
              {card.sources.length === 0 && (
                <span style={{ fontSize: 10, color: '#EB1000', fontStyle: 'italic' }}>No source — needs update</span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <div className="section-label" style={{ marginBottom: 24 }}>Key Developments Timeline</div>

      {filtered.length === 0 && (
        <p style={{ color: '#A0A0A0', fontSize: 13 }}>No developments for the selected categories.</p>
      )}

      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          left: 119,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'linear-gradient(to bottom, #EB1000, #EB100040)',
          borderRadius: 1,
        }} />

        {grouped.map(([monthKey, devs]) => (
          <div key={monthKey} style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                width: 108,
                textAlign: 'right',
                paddingRight: 12,
                fontSize: 11,
                fontWeight: 700,
                color: '#EB1000',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}>
                {formatMonth(monthKey)}
              </div>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: '#EB1000',
                border: '3px solid #1A1A1A',
                flexShrink: 0,
                marginLeft: -11,
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {devs.map((dev, i) => {
                const dotColor = categoryColors[dev.category].color;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 108,
                      textAlign: 'right',
                      paddingRight: 12,
                      fontSize: 11,
                      color: '#666',
                      flexShrink: 0,
                      paddingTop: 14,
                    }}>
                      {formatDay(dev.date)}
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      marginLeft: -5,
                      zIndex: 1,
                      paddingTop: 12,
                    }}>
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: dotColor,
                        border: '2px solid #1A1A1A',
                        boxShadow: `0 0 0 2px ${dotColor}40`,
                      }} />
                    </div>
                    <div style={{
                      width: 24,
                      height: 2,
                      background: '#333333',
                      flexShrink: 0,
                      marginTop: 17,
                    }} />
                    <div style={{
                      flex: 1,
                      background: '#111',
                      border: '1px solid #333',
                      borderLeft: `3px solid ${dotColor}`,
                      borderRadius: 4,
                      padding: '12px 14px',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 6,
                        flexWrap: 'wrap',
                      }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: '#fff' }}>{dev.title}</span>
                        <CategoryBadge category={dev.category} />
                        <span style={{
                          fontSize: 11,
                          color: '#666',
                          background: '#1e1e1e',
                          padding: '1px 6px',
                          borderRadius: 3,
                        }}>
                          {dev.competitor}
                        </span>
                      </div>
                      <p style={{ color: '#A0A0A0', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                        {dev.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
