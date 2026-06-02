import { Star } from 'lucide-react';

interface SentimentStarsProps {
  score: number;
  max?: number;
}

export function SentimentStars({ score, max = 5 }: SentimentStarsProps) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < Math.round(score) ? '#EB1000' : 'none'}
          color={i < Math.round(score) ? '#EB1000' : '#444'}
        />
      ))}
      <span style={{ fontSize: 12, color: '#A0A0A0', marginLeft: 4 }}>{score.toFixed(1)}</span>
    </span>
  );
}
