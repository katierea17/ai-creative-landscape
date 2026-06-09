import { useState } from 'react';
import { Card } from '../components/Card';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

const PLATFORM_DOMAIN: Record<string, string> = {
  'google-photos':   'google.com',
  'instagram-edits': 'instagram.com',
  'imovie':          'apple.com',
  'gemini':          'google.com',
  'chatgpt':         'openai.com',
  'claude':          'claude.ai',
  'canva':           'canva.com',
  'capcut':          'capcut.com',
  'picsart':         'picsart.com',
  'midjourney':      'midjourney.com',
  'final-cut-pro':   'apple.com',
  'affinity':        'affinity.serif.com',
  'figma':           'figma.com',
  'runway':          'runwayml.com',
};

type CreativeItem =
  | { type: 'video'; embed: string; label: string }
  | { type: 'image'; src: string; label: string };

const STUDENT_CREATIVE: Record<string, { items: CreativeItem[] }> = {
  'chatgpt': {
    items: [
      { type: 'image', src: 'https://cms.brandnewschool.com/assets/work/chatgpt/havarti_16x9_emeric_17.png', label: 'ChatGPT student campaign OOH · Brand New School · 2025' },
      { type: 'image', src: 'https://cms.brandnewschool.com/assets/work/chatgpt/havarti_1x1_emeric_05.png', label: 'ChatGPT student campaign poster · Brand New School · 2025' },
    ],
  },
  'gemini': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/Z1yGy9fELtE', label: '"New Home" · Google Gemini Super Bowl commercial · Feb 2026' },
    ],
  },
  'claude': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/zKCPHxa2gUA', label: '"Keep Thinking" · Anthropic Super Bowl campaign — "Ads are coming to AI. But not to Claude." · Feb 2026' },
    ],
  },
  'canva': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/LIF-z2w60ps', label: '"The Thing That Makes Anything A Thing" · Brand campaign · May 2026' },
    ],
  },
  'capcut': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/MorTR8pfOHQ', label: '"The Year We Created Together" · CapCut #ReCap25 brand video · Dec 2025' },
    ],
  },
  'picsart': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/jdBreCiRzZo', label: 'Picsart: The All-in-One AI Creative Suite for 150M Creators · Official · Apr 2026' },
    ],
  },
  'midjourney': {
    items: [
      { type: 'image', src: 'https://storage.ghost.io/c/95/61/95616ddb-b827-4269-ad22-ff4a6b368a1f/content/images/2026/04/V8.1bannerv2.jpg', label: 'Midjourney V8.1 Alpha launch · updates.midjourney.com · Apr 2026' },
    ],
  },
  'runway': {
    items: [
      { type: 'image', src: 'https://d3phaj0sisr2ct.cloudfront.net/site/assets/agent-launch_blog-thumb-1.webp', label: 'Runway Agent launch · May 2026' },
    ],
  },
  'figma': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/QHNhb_jj4gU', label: '"Prompt it. Then push it." · Figma Make campaign · Jan 2026' },
      { type: 'video', embed: 'https://www.youtube.com/embed/SROdrbZ8A8Q', label: 'Config 2026, refreshed · Official brand · Mar 2026' },
    ],
  },
  'final-cut-pro': {
    items: [
      { type: 'video', embed: 'https://www.youtube.com/embed/op8HMCB5JnQ', label: 'Ellie Dixon makes her debut album — commissioned by Apple Creator Studio · May 2026' },
    ],
  },
};

function VideoCreative({ creative, name }: { creative: { items: CreativeItem[] }; name: string }) {
  const [idx, setIdx] = useState(0);
  const { items } = creative;
  const item = items[idx];
  // Fixed-height container for video+nav keeps all creatives aligned across a row.
  // Caption lives outside so it's never clipped.
  return (
    <div style={{ marginTop: 12 }}>
      <div className="section-label" style={{ marginBottom: 8, color: "#111111" }}>Creative</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 4, overflow: 'hidden', background: '#e8e8e8', flexShrink: 0 }}>
          {item.type === 'video' ? (
            <iframe
              key={item.embed}
              src={item.embed}
              title={`${name} creative ${idx + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt={item.label}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
        </div>
        {items.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, flexShrink: 0 }}>
            <button onClick={() => setIdx(i => (i - 1 + items.length) % items.length)}
              style={{ background: 'none', border: '1px solid #e0e0e0', color: '#111111', borderRadius: 3, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>←</button>
            <span style={{ fontSize: 10, color: '#111111' }}>{idx + 1} of {items.length}</span>
            <button onClick={() => setIdx(i => (i + 1) % items.length)}
              style={{ background: 'none', border: '1px solid #e0e0e0', color: '#111111', borderRadius: 3, padding: '2px 10px', cursor: 'pointer', fontSize: 12 }}>→</button>
          </div>
        )}
      </div>
      <p style={{ color: '#111111', fontSize: 10, margin: '4px 0 0', fontStyle: 'italic', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.label}
      </p>
    </div>
  );
}

export function StudentMessaging() {
  const { activeCategories } = useFilter();
  const DISPLAY_ORDER = [
    'canva', 'final-cut-pro', 'picsart',
    'chatgpt', 'figma', 'runway',
    'midjourney', 'gemini', 'claude',
    'capcut', 'instagram-edits', 'google-photos', 'imovie', 'affinity',
  ];
  const filtered = competitors
    .filter(c => activeCategories.includes(c.category))
    .sort((a, b) => {
      const ai = DISPLAY_ORDER.indexOf(a.id);
      const bi = DISPLAY_ORDER.indexOf(b.id);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

  return (
    <div style={{ color: '#111111' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#111111' }}>Messaging</h1>
      <p style={{ color: '#111111', fontSize: 13, marginBottom: 8 }}>
        AI and student-focused messaging, active promos, and the most recent campaigns in market — with a focus on students where applicable.
      </p>
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
          borderRadius: 3, background: '#f0f0f0', border: '1px solid #e0e0e0',
          color: '#111111', fontSize: 10, fontWeight: 500,
        }}>
          AI Messaging: Slide 8 · Student Messaging: Slide 9 · GenAI Competitive Landscape Assessment, May 2026 · Creative: public sources, brand channels, and press coverage
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch', minWidth: 0 }}>
        {filtered.map(c => {
          const hasPromo = c.studentPromo !== null;
          return (
            <Card key={c.id} accentColor='#EB1000' light>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, minHeight: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                {PLATFORM_DOMAIN[c.id] && (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${PLATFORM_DOMAIN[c.id]}&sz=64`}
                    alt={c.name}
                    style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0 }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <div style={{ fontWeight: 700, fontSize: 15, color: '#111111' }}>{c.name}</div>
              </div>

              <div className="section-label" style={{ marginBottom: 4, color: "#111111" }}>Student Messaging</div>
              {c.studentMessaging ? (
                <p style={{ color: '#111111', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
                  {c.studentMessaging}
                </p>
              ) : (
                <p style={{ color: '#999999', fontSize: 13, fontStyle: 'italic', marginBottom: 12 }}>
                  No student messaging
                </p>
              )}

              <div className="section-label" style={{ marginBottom: 4, color: '#111111' }}>AI Messaging</div>
              <p style={{ color: '#111111', fontSize: 13, fontWeight: 400, lineHeight: 1.5, marginBottom: 12 }}>
                {c.genAiMessaging}
              </p>

              {hasPromo && (
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderLeft: '3px solid #EB1000',
                    borderRadius: 4,
                    padding: '8px 12px',
                  }}
                >
                  <div className="section-label" style={{ color: '#EB1000', marginBottom: 4 }}>Promo</div>
                  <p style={{ color: '#111111', fontSize: 13, margin: 0, fontWeight: 500 }}>{c.studentPromo}</p>
                </div>
              )}

              </div>
              {STUDENT_CREATIVE[c.id]?.items?.length > 0 && (
                <VideoCreative creative={STUDENT_CREATIVE[c.id]} name={c.name} />
              )}
            </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
