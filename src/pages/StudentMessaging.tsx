import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

export function StudentMessaging() {
  const { activeCategories } = useFilter();
  const filtered = competitors
    .filter(c => activeCategories.includes(c.category))
    .sort((a, b) => {
      const aActive = a.studentPromo !== null ? 1 : 0;
      const bActive = b.studentPromo !== null ? 1 : 0;
      return bActive - aActive;
    });

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Student Messaging</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 8 }}>
        Student-focused messaging and active promos. Sorted: active promos first.
      </p>
      <div style={{ marginBottom: 24 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
          borderRadius: 3, background: '#1e1e1e', border: '1px solid #3a3a3a',
          color: '#A0A0A0', fontSize: 10, fontWeight: 500,
        }}>
          Slide 9 · GenAI Competitive Landscape Assessment, May 2026
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filtered.map(c => {
          const hasPromo = c.studentPromo !== null;
          return (
            <Card key={c.id} accentColor={hasPromo ? '#EB1000' : undefined}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                  <CategoryBadge category={c.category} />
                </div>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 600,
                    color: hasPromo ? '#EB1000' : '#666',
                    background: hasPromo ? '#EB100018' : '#33333380',
                  }}
                >
                  {hasPromo ? 'Active' : 'None'}
                </span>
              </div>

              <div className="section-label" style={{ marginBottom: 4 }}>Student Messaging</div>
              {c.studentMessaging ? (
                <p style={{ color: '#A0A0A0', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>
                  {c.studentMessaging}
                </p>
              ) : (
                <p style={{ color: '#555', fontSize: 13, fontStyle: 'italic', marginBottom: 12 }}>
                  No student messaging
                </p>
              )}

              {hasPromo && (
                <div
                  style={{
                    background: '#EB100018',
                    border: '1px solid #EB100044',
                    borderRadius: 4,
                    padding: '8px 12px',
                  }}
                >
                  <div className="section-label" style={{ color: '#EB1000', marginBottom: 4 }}>Promo</div>
                  <p style={{ color: '#EB1000', fontSize: 13, margin: 0, fontWeight: 500 }}>{c.studentPromo}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
