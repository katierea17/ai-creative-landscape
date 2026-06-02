import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

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
  const filtered = competitors.filter(c => activeCategories.includes(c.category));

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
                  <div>{c.name}</div>
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
        </table>
      </div>
    </div>
  );
}
