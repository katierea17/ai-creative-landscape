import { useLocation } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import { competitors } from '../data/competitorData';
import type { Category } from '../data/competitorData';

// Routes that only involve a subset of categories — hide irrelevant filter pills
const ROUTE_CATEGORIES: Record<string, Category[]> = {
  '/credit-deep-dive': ['Creator Platforms', 'Professional Tools'],
};

const CATEGORY_COLORS: Record<Category, string> = {
  'Ecosystem Utilities': '#60A5FA',
  'Mass Market AI': '#A78BFA',
  'Creator Platforms': '#22C55E',
  'Professional Tools': '#F59E0B',
  'Other': '#A0A0A0',
};

export function CompetitorFilter() {
  const { activeCategories, toggleCategory, allCategories } = useFilter();
  const location = useLocation();
  const visibleCategories = ROUTE_CATEGORIES[location.pathname] ?? allCategories;

  return (
    <div
      style={{
        padding: '8px 24px',
        borderBottom: '1px solid #333',
        background: '#1A1A1A',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontSize: 11, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginRight: 4 }}>
        Filter
      </span>
      {visibleCategories.map(cat => {
        const count = competitors.filter(c => c.category === cat).length;
        const active = activeCategories.includes(cat);
        const accentColor = CATEGORY_COLORS[cat];
        // Hide "Other" on pages where it has no relevant content (count === 0 and not on may-2026)
        if (count === 0 && location.pathname !== '/may-2026') return null;
        return (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 99,
              border: `1px solid ${active ? accentColor : '#444'}`,
              background: active ? `${accentColor}22` : 'transparent',
              color: active ? accentColor : '#A0A0A0',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                borderRadius: 99,
                background: active ? accentColor : '#333',
                color: active ? '#fff' : '#666',
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
