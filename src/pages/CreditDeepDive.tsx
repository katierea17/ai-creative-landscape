import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { EditableField } from '../components/EditableField';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

const CREDIT_COMPETITORS = ['canva', 'capcut', 'picsart', 'midjourney', 'figma', 'runway'];

// Adobe is the "self" benchmark — not in competitorData, so injected as a stub
const ADOBE_STUB = {
  id: 'adobe',
  name: 'Adobe CC (Students)',
  category: 'Professional Tools' as Category,
  creditDetail: 'CC All Apps Students & Teachers: 4,000 generative credits/mo (intro rate $19.99/mo yr 1, then $39.99/mo). Credits power Firefly features across the suite — Generative Fill, Text to Image, Generative Expand, and more.',
};

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
    tierName: 'Professional ($16/mo per editor)',
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
  adobe: {
    monthlyEquiv: 4000,
    label: '4,000/mo',
    tierName: 'CC All Apps — Students & Teachers ($19.99/mo intro)',
    sourceUrl: 'https://helpx.adobe.com/creative-cloud/apps/generative-ai/generative-credits-faq.html#monthly-generative-credits',
    sourceName: 'helpx.adobe.com · Generative Credits FAQ',
  },
};

// Monthly price for the first paid tier (used for $/credit calculation)
const PAID_TIER_PRICE: Record<string, number> = {
  canva:      18.00,
  capcut:     19.99,
  picsart:    10.50,
  midjourney: 10.00,
  figma:      16.00,
  runway:     12.00,
  adobe:      19.99,
};

// Midjourney uses GPU hours / images, not a generic "credit"
const COST_PER_CREDIT_UNIT: Record<string, string> = {
  canva:      '/credit',
  capcut:     '/credit',
  picsart:    '/credit',
  midjourney: '/image*',
  figma:      '/credit',
  runway:     '/credit',
  adobe:      '/credit',
};

const OVERAGE_SOURCES: Record<string, { url: string; name: string }> = {
  canva:      { url: 'https://www.canva.com/help/ai-access/', name: 'canva.com/help/ai-access' },
  capcut:     { url: 'https://www.capcut.com/help/credit-types', name: 'capcut.com/help/credit-types' },
  picsart:    { url: 'https://support.picsart.com/hc/en-us/articles/19532716161309-How-many-credits-do-I-get', name: 'support.picsart.com' },
  midjourney: { url: 'https://docs.midjourney.com/docs/plans', name: 'docs.midjourney.com/plans' },
  figma:      { url: 'https://www.figma.com/pricing/', name: 'figma.com/pricing' },
  runway:     { url: 'https://runwayml.com/pricing', name: 'runwayml.com/pricing' },
  adobe:      { url: 'https://www.adobe.com/ai/overview/generative-credits.html#get-credits-get-creative', name: 'adobe.com · Generative Credits add-on plans' },
};

const STUDENT_PROMO_NOTE: Record<string, { short: string; effectiveCost: string | null }> = {
  canva:  { short: 'Free for students', effectiveCost: '$0/credit' },
  figma:  { short: 'Free (Figma for Education)', effectiveCost: '$0/credit' },
  runway: { short: '25% off + 100K credits via Ambassador', effectiveCost: null },
  adobe:  { short: 'Intro rate yr 1 only; $39.99/mo after', effectiveCost: null },
};

const CREDIT_NAMES: Record<string, string> = {
  canva: 'Magic Studio Credits',
  capcut: 'AI Credits',
  picsart: 'AI Credits',
  midjourney: 'GPU Hours',
  figma: 'AI Credits',
  runway: 'Credits',
  adobe: 'Generative Credits',
};

const CREDIT_LANGUAGE: Record<string, { name: string; pitch: string }> = {
  'canva':      { name: 'Magic Studio Credits', pitch: '"Power your creative work" — credits unlock Magic Media, Magic Eraser, Magic Write, and other AI tools. Free tier gets 50/mo; Pro gets 500/mo. Scarcity framing encourages upgrade.' },
  'capcut':     { name: 'AI Credits', pitch: 'Credits gate premium AI features like AI text-to-video and AI avatars. Free tier: 150/wk. Pro: 1,200/mo. Positioned as "unlock the full power of CapCut AI."' },
  'picsart':    { name: 'AI Credits', pitch: 'Credits give access to 130+ AI models across image, video, and audio. Pro tier: 500/mo. Marketed as "the fuel for your creative AI workflow."' },
  'midjourney': { name: 'Fast GPU Hours', pitch: '"Your time to create at full speed." GPU hours are compute time for image generation — Basic gets 3.3 fast hrs/mo (~200 images). Highly technical framing that signals quality over convenience.' },
  'figma':      { name: 'AI Credits', pitch: '"Credits enable Figma AI features across your workflow." Professional seats get 3,000/mo. Positioned as a professional resource tied to seat type, not a consumer upsell.' },
  'runway':     { name: 'Credits', pitch: '"5–10 credits per second of video." Runway is the only competitor to market credits by the output second, making cost feel transparent and tied directly to creative output quality.' },
  'adobe':      { name: 'Generative Credits', pitch: '"Create without limits." Generative Credits power Firefly AI features across Creative Cloud — Generative Fill, Text to Image, Generative Expand, and more. CC All Apps includes 4,000 credits/mo. Framed as included in your subscription, not a metered add-on.' },
};

export function CreditDeepDive() {
  const { activeCategories } = useFilter();
  const creditCompetitors = [
    ADOBE_STUB as typeof competitors[0],
    ...competitors.filter(c => CREDIT_COMPETITORS.includes(c.id) && activeCategories.includes(c.category)),
  ];
  // Tags sourced from deck only — Canva (Slide 11), CapCut (Slide 14), Figma (Slide 21)
  // Picsart, Midjourney, Runway cleared — not in deck
  const [tags, setTags] = useState<Record<string, string[]>>({
    adobe: ['Generative Fill', 'Text to Image', 'Generative Expand', 'Text to Vector', 'Generative Recolor'],
    canva: ['Magic Design', 'Magic Write', 'Magic Switch/Translate', 'Magic Tools', 'Magic Layers'],
    capcut: ['AI Remix', 'Auto Caption', 'Auto Removal', 'Motion Tracking'],
    picsart: [],
    midjourney: [],
    figma: ['Make Designs', 'Rename Layers', 'Translate', 'AI Autocomplete'],
    runway: [],
  });
  const [overages, setOverages] = useState<Record<string, string>>({
    adobe: 'Add-on packs: 2,000 credits $9.99/mo · 7,000 credits $29.99/mo · 10,000 credits $49.99/mo · 50,000 credits $199.99/mo (~$0.004–0.005/credit). Source: adobe.com/ai/overview/generative-credits.html',
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
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, flexWrap: 'wrap', maxWidth: 280 }}>
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
                  {STUDENT_PROMO_NOTE[c.id] && (
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: '#14B8A6', background: '#14B8A615',
                      border: '1px solid #14B8A640',
                      borderRadius: 3, padding: '1px 6px',
                    }}>
                      🎓 {STUDENT_PROMO_NOTE[c.id].short}
                    </span>
                  )}
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
                <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, flexWrap: 'wrap', maxWidth: 280 }}>
                  <span style={{ color: '#A78BFA' }}>{displayCost}{unit}</span>
                  <span style={{ fontSize: 10, color: '#555', fontWeight: 400 }}>· ${price}/mo ÷ {credits.toLocaleString()} credits</span>
                  {STUDENT_PROMO_NOTE[c.id] && (
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: '#14B8A6', background: '#14B8A615',
                      border: '1px solid #14B8A640',
                      borderRadius: 3, padding: '1px 6px',
                    }}>
                      🎓 {STUDENT_PROMO_NOTE[c.id].effectiveCost
                        ? `${STUDENT_PROMO_NOTE[c.id].effectiveCost} for students`
                        : STUDENT_PROMO_NOTE[c.id].short}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated student usage */}
      <div style={{ marginBottom: 40 }}>
        <div className="section-label" style={{ marginBottom: 4 }}>Estimated Free-Tier Usage — Typical Student</div>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 16, fontStyle: 'italic' }}>
          Rough estimates based on Q5 survey data (most students use AI for 11–50% of creative work), typical task credit costs per platform, and ~2–3 AI-assisted sessions per week. Bars show estimated % of free tier consumed monthly. Not hard data — directional only.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'adobe',      pct: 0,  label: 'N/A',   color: '#555',    note: 'No free tier for CC All Apps. Students must subscribe — but at $19.99/mo intro, the 4,000 credit/mo paid allocation means upgrade pressure is essentially zero for typical use.' },
            { id: 'canva',      pct: 48, label: '~48%',  color: '#14B8A6', note: '~24 credits/mo — 2 sessions/wk, ~3 credits each (1 image gen + 1 edit). Close to limit; upgrade pressure is real.' },
            { id: 'picsart',    pct: 90, label: '~90%+', color: '#F97316', note: 'Only 5 credits/wk free (~20/mo). Even light use — 1–2 AI image gens/week — nearly exhausts the free tier.' },
            { id: 'capcut',     pct: 20, label: '~20%',  color: '#14B8A6', note: '~120 credits/mo of 600 free. Auto Caption + AI Remix on 1–2 videos/wk. Plenty of headroom.' },
            { id: 'figma',      pct: 5,  label: '~5%',   color: '#14B8A6', note: '~25 credits/mo of 500 free. AI in Figma is incidental to design work for most students.' },
            { id: 'midjourney', pct: 0,  label: 'N/A',   color: '#555',    note: 'No free tier. The paywall self-selects — students who use Midjourney have already paid and tend to be heavy users.' },
            { id: 'runway',     pct: 0,  label: 'N/A',   color: '#555',    note: '125 one-time free credits. A single 5-second video costs 25–50 credits — a student exhausts the free tier in 2–5 projects, then hits a hard wall.' },
          ].filter(row => creditCompetitors.find(c => c.id === row.id)).map(row => {
            const comp = creditCompetitors.find(c => c.id === row.id)!;
            return (
              <div key={row.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <div style={{ width: 100, fontSize: 12, color: '#A0A0A0', textAlign: 'right', flexShrink: 0 }}>{comp.name}</div>
                  <div style={{ flex: 1, background: '#2a2a2a', borderRadius: 2, height: 22, overflow: 'hidden' }}>
                    {row.pct > 0 && (
                      <div style={{ width: `${Math.min(row.pct, 100)}%`, height: '100%', background: row.color, borderRadius: 2, opacity: 0.85 }} />
                    )}
                  </div>
                  <div style={{ width: 44, fontSize: 12, fontWeight: 600, color: row.color, flexShrink: 0 }}>{row.label}</div>
                </div>
                <div style={{ marginLeft: 112, fontSize: 11, color: '#555', lineHeight: 1.4, marginBottom: 2 }}>{row.note}</div>
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
            {CREDIT_LANGUAGE[c.id] && (
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #2a2a2a' }}>
                <div className="section-label" style={{ marginBottom: 6 }}>Credit / Token Marketing</div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '2px 8px', borderRadius: 3,
                  background: '#1e1e1e', border: '1px solid #3a3a3a',
                  color: '#fff', fontSize: 11, fontWeight: 600, marginBottom: 6,
                }}>
                  {CREDIT_LANGUAGE[c.id].name}
                </span>
                <p style={{ color: '#A0A0A0', fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                  {CREDIT_LANGUAGE[c.id].pitch}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
