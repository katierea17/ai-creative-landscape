import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';

function SourceChip({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
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

export function CustomerSentiment() {
  const { activeCategories } = useFilter();
  const filtered = competitors
    .filter(c => activeCategories.includes(c.category))
    .sort((a, b) => b.sentiment.score - a.sentiment.score);

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Customer Sentiment</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <SourceChip label="Q7 · Best overall · GenAI Tracker n=137" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(c => {
          const praised = c.sentiment.praised.filter(x => !x.includes('Q9'));
          const hasQ7 = c.sentiment.score > 0;

          return (
            <Card key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.name}</div>
                  <CategoryBadge category={c.category} />
                </div>
              </div>

              {/* Q7 best-overall stat */}
              <div style={{ marginBottom: 14 }}>
                <div className="section-label" style={{ marginBottom: 6 }}>Q7 · Named Best Overall</div>
                {hasQ7 ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: 32, fontWeight: 800, color: '#EB1000', lineHeight: 1 }}>
                      {c.sentiment.score}%
                    </span>
                    <span style={{ fontSize: 11, color: '#666' }}>of 137 respondents</span>
                  </div>
                ) : (
                  <span style={{ fontSize: 13, color: '#555', fontStyle: 'italic' }}>
                    Not named in Q7 responses
                  </span>
                )}
              </div>

              {praised.length > 0 && (
                <div>
                  <div className="section-label" style={{ marginBottom: 6 }}>Why Respondents Prefer It</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {praised.map(p => (
                      <li key={p} style={{ fontSize: 12, color: '#A0A0A0', display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 3 }}>
                        <span style={{ color: '#14B8A6', marginTop: 2 }}>•</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
