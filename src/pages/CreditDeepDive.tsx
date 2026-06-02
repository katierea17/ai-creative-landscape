import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { EditableField } from '../components/EditableField';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

const CREDIT_COMPETITORS = ['canva', 'capcut', 'picsart', 'midjourney', 'figma', 'runway'];

// First paid tier credits — monthly equivalent for bar comparison
const PAID_TIER_CREDITS: Record<string, {
  monthlyEquiv: number;
  label: string;
  tierName: string;
  sourceUrl: string;
  sourceName: string;
}> = {
  canva: {
    monthlyEquiv: 500,
    label: '500/mo',
    tierName: 'Pro ($18/mo)',
    sourceUrl: 'https://www.canva.com/help/ai-access/',
    sourceName: 'canva.com/help/ai-access',
  },
  capcut: {
    monthlyEquiv: 1200,
    label: '1,200/mo',
    tierName: 'Pro ($19.99/mo)',
    sourceUrl: 'https://www.capcut.com/help/how-much-does-capcut-pro-cost',
    sourceName: 'capcut.com/help/how-much-does-capcut-pro-cost',
  },
  picsart: {
    monthlyEquiv: 500,
    label: '500/mo',
    tierName: 'Pro ($10.50/mo)',
    sourceUrl: 'https://picsart.com/pricing/',
    sourceName: 'picsart.com/pricing',
  },
  midjourney: {
    monthlyEquiv: 200,
    label: '3.3 fast GPU hrs (~200 images)',
    tierName: 'Basic ($10/mo)',
    sourceUrl: 'https://docs.midjourney.com/hc/en-us/articles/32016412137741-GPU-Speed-Fast-Relax-Turbo',
    sourceName: 'docs.midjourney.com',
  },
  figma: {
    monthlyEquiv: 3000,
    label: '3,000/mo (Full seat)',
    tierName: 'Professional ($12/mo per editor)',
    sourceUrl: 'https://help.figma.com/hc/en-us/articles/33459875669015-How-AI-credits-work',
    sourceName: 'help.figma.com',
  },
  runway: {
    monthlyEquiv: 625,
    label: '625/mo',
    tierName: 'Standard ($12/mo)',
    sourceUrl: 'https://runwayml.com/pricing',
    sourceName: 'runwayml.com/pricing',
  },
};

// Monthly price for the first paid tier (used for $/credit calculation)
const PAID_TIER_PRICE: Record<string, number> = {
  canva:      18.00,
  capcut:     19.99,
  picsart:    10.50,
  midjourney: 10.00,
  figma:      12.00,
  runway:     12.00,
};

// Midjourney uses GPU hours / images, not a generic "credit"
const COST_PER_CREDIT_UNIT: Record<string, string> = {
  canva:      '/credit',
  capcut:     '/credit',
  picsart:    '/credit',
  midjourney: '/image*',
  figma:      '/credit',
  runway:     '/credit',
};

const OVERAGE_SOURCES: Record<string, { url: string; name: string }> = {
  canva:      { url: 'https://www.canva.com/help/ai-access/', name: 'canva.com/help/ai-access' },
  capcut:     { url: 'https://www.capcut.com/help/credit-types', name: 'capcut.com/help/credit-types' },
  picsart:    { url: 'https://support.picsart.com/hc/en-us/articles/19532716161309-How-many-credits-do-I-get', name: 'support.picsart.com' },
  midjourney: { url: 'https://docs.midjourney.com/docs/plans', name: 'docs.midjourney.com/plans' },
  figma:      { url: 'https://www.figma.com/pricing/', name: 'figma.com/pricing' },
  runway:     { url: 'https://runwayml.com/pricing', name: 'runwayml.com/pricing' },
};

const CREDIT_NAMES: Record<string, string> = {
  canva: 'Magic Studio Credits',
  capcut: 'AI Credits',
  picsart: 'AI Credits',
  midjourney: 'GPU Hours',
  figma: 'AI Credits',
  runway: 'Credits',
};

export function CreditDeepDive() {
  const { activeCategories } = useFilter();
  const creditCompetitors = competitors.filter(
    c => CREDIT_COMPETITORS.includes(c.id) && activeCategories.includes(c.category)
  );
  // Tags sourced from deck only — Canva (Slide 11), CapCut (Slide 14), Figma (Slide 21)
  // Picsart, Midjourney, Runway cleared — not in deck
  const [tags, setTags] = useState<Record<string, string[]>>({
    canva: ['Magic Design', 'Magic Write', 'Magic Switch/Translate', 'Magic Tools', 'Magic Layers'],
    capcut: ['AI Remix', 'Auto Caption', 'Auto Removal', 'Motion Tracking'],
    picsart: [],
    midjourney: [],
    figma: ['Make Designs', 'Rename Layers', 'Translate', 'AI Autocomplete'],
    runway: [],
  });
  const [overages, setOverages] = useState<Record<string, string>>({
    canva: 'Purchase additional credit packs (e.g. 100 credits add-on)',
    capcut: 'Purchase additional credits at $4.99 / 100 credits; purchased credits valid 2 years',
    picsart: 'Purchase additional credits or upgrade to Ultra plan',
    midjourney: 'Purchase additional GPU hours at $4/hr or upgrade to Standard',
    figma: 'Purchase credit packs ($120/mo for 5,000) or pay-as-you-go at $0.03/credit',
    runway: 'Purchase credit top-ups or upgrade to Pro ($28/mo, 2,250 credits)',
  });
  const [newTag, setNewTag] = useState<Record<string, string>>({});

  const maxCredits = Math.max(...creditCompetitors.map(c => PAID_TIER_CREDITS[c.id].monthlyEquiv), 1);

  function removeTag(id: string, tag: string) {
    setTags(prev => ({ ...prev, [id]: prev[id].filter(t => t !== tag) }));
  }

  function addTag(id: string) {
    const t = (newTag[id] || '').trim();
    if (!t) return;
    setTags(prev => ({ ...prev, [id]: [...(prev[id] || []), t] }));
    setNewTag(prev => ({ ...prev, [id]: '' }));
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>AI Credit Deep Dive</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        Competitors with AI credit systems — 6 platforms tracked.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {([
          { label: 'Plan tiers · Slide 7 · GenAI Competitive Landscape Assessment, May 2026', url: null },
          { label: 'What consumes credits (Canva, CapCut, Figma) · Slides 11, 14, 21 · GenAI Competitive Landscape Assessment, May 2026', url: null },
          { label: 'First paid tier credits · canva.com, figma.com, runwayml.com, capcut.com, picsart.com, docs.midjourney.com (May 2026)', url: null },
        ] as { label: string; url: string | null }[]).map(s => (
          <span key={s.label} style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#A0A0A0', fontSize: 10, fontWeight: 500 }}>
            {s.label}
          </span>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ marginBottom: 40 }}>
        <div className="section-label" style={{ marginBottom: 4 }}>First Paid Tier — Credits Comparison</div>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 16, fontStyle: 'italic' }}>
          Credits included in the first paid subscription tier. Midjourney GPU hours shown as ~image equivalent.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {creditCompetitors.map(c => {
            const entry = PAID_TIER_CREDITS[c.id];
            const pct = maxCredits > 0 ? (entry.monthlyEquiv / maxCredits) * 100 : 0;
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 100, fontSize: 12, color: '#A0A0A0', textAlign: 'right', flexShrink: 0 }}>{c.name}</div>
                <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 2, height: 24, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #EB1000, #FF4444)',
                    borderRadius: 2,
                    transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ width: 220, fontSize: 12, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span>{entry.label}</span>
                  <span style={{ fontSize: 10, color: '#555', fontWeight: 400 }}>· {entry.tierName}</span>
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#06B6D4', fontSize: 10, fontWeight: 400, textDecoration: 'none', marginLeft: 2 }}
                    title={entry.sourceName}
                  >
                    ↗
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost per credit chart */}
      <div style={{ marginBottom: 40 }}>
        <div className="section-label" style={{ marginBottom: 4 }}>Cost per Credit — First Paid Tier</div>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 16, fontStyle: 'italic' }}>
          Monthly plan price ÷ credits included. Lower bar = better value. *Midjourney shown per image (~200/mo from 3.3 GPU hrs).
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {creditCompetitors.map(c => {
            const price = PAID_TIER_PRICE[c.id];
            const credits = PAID_TIER_CREDITS[c.id].monthlyEquiv;
            const costPerCredit = credits > 0 ? price / credits : 0;
            const maxCost = Math.max(...creditCompetitors.map(cc => {
              const p = PAID_TIER_PRICE[cc.id];
              const cr = PAID_TIER_CREDITS[cc.id].monthlyEquiv;
              return cr > 0 ? p / cr : 0;
            }));
            const pct = maxCost > 0 ? (costPerCredit / maxCost) * 100 : 0;
            const displayCost = costPerCredit < 0.01
              ? `${(costPerCredit * 100).toFixed(2)}¢`
              : costPerCredit < 0.10
              ? `${(costPerCredit * 100).toFixed(1)}¢`
              : `$${costPerCredit.toFixed(3)}`;
            const unit = COST_PER_CREDIT_UNIT[c.id];
            return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 100, fontSize: 12, color: '#A0A0A0', textAlign: 'right', flexShrink: 0 }}>{c.name}</div>
                <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 2, height: 24, overflow: 'hidden' }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
                    borderRadius: 2,
                    transition: 'width 0.5s',
                  }} />
                </div>
                <div style={{ width: 220, fontSize: 12, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{ color: '#A78BFA' }}>{displayCost}{unit}</span>
                  <span style={{ fontSize: 10, color: '#555', fontWeight: 400 }}>· ${price}/mo ÷ {credits.toLocaleString()} credits</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {creditCompetitors.map(c => (
          <Card key={c.id} accentColor="#EB1000">
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
              <CategoryBadge category={c.category} />
            </div>

            <div className="section-label" style={{ marginBottom: 4 }}>Credit Name</div>
            <p style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>{CREDIT_NAMES[c.id]}</p>

            <div className="section-label" style={{ marginBottom: 4 }}>Plan Tiers</div>
            <p style={{ color: '#A0A0A0', fontSize: 12, marginBottom: 12, lineHeight: 1.6 }}>
              {c.creditDetail || '—'}
            </p>

            {(tags[c.id]?.length > 0) && (
              <>
                <div className="section-label" style={{ marginBottom: 6 }}>What Consumes Credits</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {tags[c.id].map(tag => (
                    <span
                      key={tag}
                      style={{
                        background: '#EB100018',
                        color: '#EB1000',
                        border: '1px solid #EB100040',
                        borderRadius: 3,
                        padding: '2px 8px',
                        fontSize: 11,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onClick={() => removeTag(c.id, tag)}
                      title="Click to remove"
                    >
                      {tag} ×
                    </span>
                  ))}
                  <input
                    value={newTag[c.id] || ''}
                    onChange={e => setNewTag(prev => ({ ...prev, [c.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addTag(c.id)}
                    placeholder="+ Add"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #444',
                      color: '#A0A0A0',
                      fontSize: 11,
                      outline: 'none',
                      width: 60,
                      padding: '2px 0',
                    }}
                  />
                </div>
              </>
            )}

            <div className="section-label" style={{ marginBottom: 4 }}>Overage Behavior</div>
            <EditableField
              value={overages[c.id] || ''}
              onChange={val => setOverages(prev => ({ ...prev, [c.id]: val }))}
              style={{ fontSize: 12, color: '#A0A0A0' }}
              placeholder="Describe overage behavior…"
            />
            {OVERAGE_SOURCES[c.id] && (
              <div style={{ marginTop: 6 }}>
                <a
                  href={OVERAGE_SOURCES[c.id].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    padding: '1px 6px', borderRadius: 3,
                    background: '#1e1e1e', border: '1px solid #3a3a3a',
                    color: '#06B6D4', fontSize: 9, fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <ExternalLink size={8} />
                  {OVERAGE_SOURCES[c.id].name}
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
