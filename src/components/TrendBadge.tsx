import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Trend } from '../data/competitorData';

interface TrendBadgeProps {
  trend: Trend;
}

const config = {
  Up: { color: '#14B8A6', bg: '#14B8A622', icon: TrendingUp, label: 'Up' },
  Down: { color: '#EB1000', bg: '#EB100022', icon: TrendingDown, label: 'Down' },
  Flat: { color: '#A0A0A0', bg: '#A0A0A022', icon: Minus, label: 'Flat' },
};

export function TrendBadge({ trend }: TrendBadgeProps) {
  const { color, bg, icon: Icon, label } = config[trend];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 99,
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      <Icon size={12} />
      {label}
    </span>
  );
}
