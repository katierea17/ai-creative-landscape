import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

export function CoreValueProp() {
  const { activeCategories } = useFilter();
  const filtered = competitors.filter(c => activeCategories.includes(c.category));

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Core Value Props</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        Value propositions and MAU by competitor.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a', color: '#A0A0A0', fontSize: 10, fontWeight: 500 }}>
          Core Value Prop · Slide 4 · GenAI Competitive Landscape Assessment, May 2026
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {filtered.map(c => (
          <Card key={c.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                <CategoryBadge category={c.category} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 11, color: '#A0A0A0' }}>{c.mau} MAU</span>
              </div>
            </div>
            <p style={{ color: '#A0A0A0', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
              {c.coreValueProp}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
