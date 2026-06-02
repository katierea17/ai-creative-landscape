import type { Category } from '../data/competitorData';

const colors: Record<Category, { color: string; bg: string }> = {
  'Ecosystem Utilities': { color: '#60A5FA', bg: '#60A5FA18' },
  'Mass Market AI': { color: '#A78BFA', bg: '#A78BFA18' },
  'Creator Platforms': { color: '#22C55E', bg: '#22C55E18' },
  'Professional Tools': { color: '#F59E0B', bg: '#F59E0B18' },
  'Other':              { color: '#A0A0A0', bg: '#A0A0A018' },
};

interface CategoryBadgeProps {
  category: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const { color, bg } = colors[category];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 8px',
        borderRadius: 3,
        fontSize: 11,
        fontWeight: 600,
        color,
        background: bg,
        letterSpacing: '0.04em',
      }}
    >
      {category}
    </span>
  );
}

export { colors as categoryColors };
