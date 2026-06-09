import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

const ADOBE_PRICING_STUB = {
  id: 'adobe',
  name: 'Adobe CC (Students)',
  category: 'Professional Tools' as Category,
  pricing: {
    free: false as boolean,
    premiumSubscription: 'CC All Apps $69.99/mo standard (annual, billed monthly); intro promo $34.99/mo first 3 mo — not available to education',
    oneTimePurchase: null as null,
    aiCredits: true as boolean,
    studentPrice: '$19.99/mo intro (yr 1), $39.99/mo after',
    studentPromo: 'Students & Teachers: ~50% off standard rate after intro year',
    notableChange: '4,000 Generative Credits/mo included; Firefly AI across suite — Generative Fill, Text to Image, Expand, Recolor',
  },
};

const UNVERIFIED_NOTES: Record<string, string[]> = {
  chatgpt:    ['openai.com/chatgpt/pricing returned 403', 'Plus $20/mo, Pro $200/mo consistent with all prior sources'],
  midjourney: ['docs.midjourney.com returned 403', 'Basic $10/mo consistent with all prior sources'],
  capcut:     ['Official help page states pricing varies by region, device, and promotion', 'No canonical price listed — $19.99/mo is the US list price but may not apply globally'],
  affinity:   ['affinity.serif.com redirects to Canva — original domain no longer accessible', 'Free status documented from Canva acquisition announcement (Oct 2025)'],
};

function UnverifiedFlag({ notes }: { notes: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span style={{
        fontSize: 9, fontWeight: 700, color: '#F97316',
        background: '#F9731618', border: '1px solid #F9731640',
        borderRadius: 3, padding: '1px 5px', cursor: 'default', letterSpacing: '0.03em',
      }}>
        ⚠ unverified
      </span>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 6, zIndex: 50, width: 260,
          background: '#1a1a1a', border: '1px solid #3a3a3a',
          borderRadius: 4, padding: '10px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#F97316', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Could not verify directly
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {notes.map((n, i) => (
              <li key={i} style={{ fontSize: 11, color: '#A0A0A0', lineHeight: 1.4, display: 'flex', gap: 6 }}>
                <span style={{ color: '#F97316', flexShrink: 0 }}>•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
}

const PRICING_SOURCES: Record<string, { url: string; label: string }> = {
  'google-photos':   { url: 'https://one.google.com/about/plans',               label: 'one.google.com' },
  'instagram-edits': { url: 'https://about.instagram.com/features/edits',        label: 'about.instagram.com' },
  'imovie':          { url: 'https://www.apple.com/imovie/',                      label: 'apple.com/imovie' },
  'gemini':          { url: 'https://one.google.com/about/ai',                    label: 'one.google.com/ai' },
  'chatgpt':         { url: 'https://openai.com/chatgpt/pricing',                 label: 'openai.com/pricing' },
  'claude':          { url: 'https://www.anthropic.com/pricing',                  label: 'anthropic.com/pricing' },
  'canva':           { url: 'https://www.canva.com/pricing/',                     label: 'canva.com/pricing' },
  'capcut':          { url: 'https://www.capcut.com/help/how-much-does-capcut-pro-cost', label: 'capcut.com/pricing' },
  'picsart':         { url: 'https://picsart.com/pricing/',                       label: 'picsart.com/pricing' },
  'midjourney':      { url: 'https://docs.midjourney.com/docs/plans',                       label: 'docs.midjourney.com/plans' },
  'final-cut-pro':   { url: 'https://www.apple.com/final-cut-pro/',               label: 'apple.com/fcp' },
  'affinity':        { url: 'https://affinity.serif.com/en-us/',                  label: 'affinity.serif.com' },
  'figma':           { url: 'https://www.figma.com/pricing/',                     label: 'figma.com/pricing' },
  'runway':          { url: 'https://runwayml.com/pricing',                       label: 'runwayml.com/pricing' },
  'adobe':           { url: 'https://www.adobe.com/creativecloud/plans.html',     label: 'adobe.com/cc/plans' },
};

function Cell({ value, amber }: { value: string | null | boolean; amber?: boolean }) {
  if (value === null || value === undefined) {
    return <span style={{ color: '#555' }}>—</span>;
  }
  if (typeof value === 'boolean') {
    return <span style={{ color: value ? '#14B8A6' : '#555' }}>{value ? '✓' : '✗'}</span>;
  }
  return (
    <span style={{ color: amber ? '#F97316' : '#fff', fontSize: 13 }}>{value}</span>
  );
}

const ROWS = [
  { label: 'Free Tier', key: 'free' },
  { label: 'Entry Paid', key: 'premiumSubscription' },
  { label: 'One-Time Purchase', key: 'oneTimePurchase' },
  { label: 'AI Credits', key: 'aiCredits' },
  { label: 'Student Price', key: 'studentPrice' },
  { label: 'Student Promo', key: 'studentPromo' },
  { label: 'Notable Change', key: 'notableChange' },
] as const;

export function Pricing() {
  const { activeCategories } = useFilter();
  const filtered = [
    ...(activeCategories.includes('Professional Tools') ? [ADOBE_PRICING_STUB as typeof competitors[0]] : []),
    ...competitors.filter(c => activeCategories.includes(c.category)),
  ];

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Pricing Comparison</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 24 }}>
        {filtered.length} competitors · Amber = notable change · Scroll horizontally to see all
      </p>

      <div className="scrollable-table">
        <table style={{ minWidth: filtered.length * 160 + 160 }}>
          <thead>
            <tr>
              <th style={{ minWidth: 160, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 2, borderRight: '1px solid #333' }}>
                Metric
              </th>
              {filtered.map(c => (
                <th key={c.id} style={{ minWidth: 160, color: '#fff', fontWeight: 700, fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                    {c.name}
                    {UNVERIFIED_NOTES[c.id] && <UnverifiedFlag notes={UNVERIFIED_NOTES[c.id]} />}
                  </div>
                  <div style={{ fontSize: 10, color: '#666', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                    {c.category}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(row => (
              <tr key={row.key} style={{ background: row.key === 'notableChange' ? '#1f1f1f' : 'transparent' }}>
                <td
                  style={{
                    color: '#A0A0A0',
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#1A1A1A',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1,
                    borderRight: '1px solid #333',
                  }}
                >
                  {row.label}
                </td>
                {filtered.map(c => {
                  const val = c.pricing[row.key];
                  const isAmber = row.key === 'notableChange' && val !== null;
                  return (
                    <td key={c.id} style={{ background: isAmber ? '#F9731612' : 'transparent', maxWidth: 200, textAlign: 'center' }}>
                      <Cell value={val as string | null | boolean} amber={isAmber} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ color: '#444', fontSize: 10, background: '#1A1A1A', position: 'sticky', left: 0, zIndex: 1, borderRight: '1px solid #333', borderTop: '1px solid #333', fontWeight: 600, paddingTop: 10 }}>
                Source
              </td>
              {filtered.map(c => {
                const src = PRICING_SOURCES[c.id];
                return (
                  <td key={c.id} style={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: 10 }}>
                    {src ? (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '1px 5px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#555', fontSize: 9, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        <ExternalLink size={7} />
                        {src.label}
                      </a>
                    ) : (
                      <span style={{ color: '#C0C0C0', fontSize: 9 }}>—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
