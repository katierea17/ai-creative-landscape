import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../components/Card';
import { CategoryBadge } from '../components/CategoryBadge';
import { useFilter } from '../context/FilterContext';
import { fourPShifts } from '../data/competitorData';
import type { FourPShift, Category } from '../data/competitorData';

const COLUMNS: FourPShift['p'][] = ['Product', 'Pricing', 'Partnerships', 'Promotion'];

const COLUMN_COLORS: Record<FourPShift['p'], string> = {
  Product: '#06B6D4',
  Pricing: '#F97316',
  Partnerships: '#EC4899',
  Promotion: '#14B8A6',
};

let nextId = 100;

interface NewShiftState {
  title: string;
  description: string;
  date: string;
}

export function FourPShifts() {
  const { activeCategories } = useFilter();
  const [customShifts, setCustomShifts] = useState<FourPShift[]>([]);
  const [adding, setAdding] = useState<Record<FourPShift['p'], boolean>>({
    Product: false, Pricing: false, Partnerships: false, Promotion: false,
  });
  const [newShift, setNewShift] = useState<Record<FourPShift['p'], NewShiftState>>({
    Product: { title: '', description: '', date: '' },
    Pricing: { title: '', description: '', date: '' },
    Partnerships: { title: '', description: '', date: '' },
    Promotion: { title: '', description: '', date: '' },
  });

  const allShifts = [...fourPShifts, ...customShifts];

  function addShift(p: FourPShift['p']) {
    const ns = newShift[p];
    if (!ns.title.trim()) return;
    setCustomShifts(prev => [
      ...prev,
      {
        id: `custom-${nextId++}`,
        competitor: ns.title,
        category: 'Creator Platforms' as Category,
        p,
        shift: ns.description,
        source: 'Manual',
        date: ns.date || 'May 2026',
      },
    ]);
    setAdding(prev => ({ ...prev, [p]: false }));
    setNewShift(prev => ({ ...prev, [p]: { title: '', description: '', date: '' } }));
  }

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#fff' }}>Marketing Mix</h1>
      <p style={{ color: '#A0A0A0', fontSize: 13, marginBottom: 24 }}>
        Strategically important moves Jan through April 2026 across product, pricing, partnerships, and promotion.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {COLUMNS.map(p => {
          const shifts = allShifts.filter(
            s => s.p === p && activeCategories.includes(s.category)
          );
          const color = COLUMN_COLORS[p];
          return (
            <div key={p}>
              <div
                style={{
                  padding: '8px 12px',
                  background: `${color}18`,
                  border: `1px solid ${color}40`,
                  borderRadius: 4,
                  marginBottom: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 14, color }}>{p}</span>
                <span
                  style={{
                    background: color,
                    color: '#fff',
                    borderRadius: 99,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {shifts.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {shifts.map(shift => (
                  <Card key={shift.id} accentColor={color}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{shift.competitor}</span>
                      <span style={{ fontSize: 10, color: '#555', background: '#2a2a2a', padding: '2px 6px', borderRadius: 3 }}>
                        {shift.date}
                      </span>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <CategoryBadge category={shift.category} />
                    </div>
                    <p style={{ color: '#A0A0A0', fontSize: 12, lineHeight: 1.5, margin: 0, marginBottom: 8 }}>
                      {shift.shift}
                    </p>
                    <span style={{ fontSize: 10, color: '#666', fontStyle: 'italic' }}>{shift.source}</span>
                  </Card>
                ))}

                {adding[p] ? (
                  <Card>
                    <input
                      placeholder="Competitor name"
                      value={newShift[p].title}
                      onChange={e => setNewShift(prev => ({ ...prev, [p]: { ...prev[p], title: e.target.value } }))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #444',
                        color: '#fff',
                        width: '100%',
                        marginBottom: 8,
                        fontSize: 13,
                        outline: 'none',
                        fontFamily: 'inherit',
                        padding: '2px 0',
                      }}
                    />
                    <textarea
                      placeholder="Shift description…"
                      value={newShift[p].description}
                      onChange={e => setNewShift(prev => ({ ...prev, [p]: { ...prev[p], description: e.target.value } }))}
                      rows={3}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #444',
                        color: '#A0A0A0',
                        width: '100%',
                        marginBottom: 8,
                        fontSize: 12,
                        outline: 'none',
                        fontFamily: 'inherit',
                        resize: 'none',
                        padding: '2px 0',
                      }}
                    />
                    <input
                      placeholder="Date (e.g. May 2026)"
                      value={newShift[p].date}
                      onChange={e => setNewShift(prev => ({ ...prev, [p]: { ...prev[p], date: e.target.value } }))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #444',
                        color: '#A0A0A0',
                        width: '100%',
                        marginBottom: 12,
                        fontSize: 12,
                        outline: 'none',
                        fontFamily: 'inherit',
                        padding: '2px 0',
                      }}
                    />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => addShift(p)}
                        style={{
                          background: '#EB1000',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 3,
                          padding: '4px 12px',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAdding(prev => ({ ...prev, [p]: false }))}
                        style={{
                          background: 'transparent',
                          color: '#A0A0A0',
                          border: '1px solid #444',
                          borderRadius: 3,
                          padding: '4px 12px',
                          fontSize: 12,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </Card>
                ) : (
                  <button
                    onClick={() => setAdding(prev => ({ ...prev, [p]: true }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'transparent',
                      border: '1px dashed #444',
                      borderRadius: 4,
                      color: '#666',
                      fontSize: 12,
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      width: '100%',
                      transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#EB1000';
                      (e.currentTarget as HTMLButtonElement).style.color = '#EB1000';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#444';
                      (e.currentTarget as HTMLButtonElement).style.color = '#666';
                    }}
                  >
                    <Plus size={14} />
                    Add Shift
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
