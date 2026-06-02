import { useState } from 'react';

interface CapabilityDotProps {
  value: boolean | string;
  partial?: boolean;
  placement?: 'above' | 'below';
}

export function CapabilityDot({ value, partial = false, placement = 'below' }: CapabilityDotProps) {
  const [visible, setVisible] = useState(false);

  let symbol: string;
  let color: string;
  let fontSize: number;
  let tooltipText: string;

  if (value === false || value === '') {
    symbol = '✗'; color = '#555'; fontSize = 16; tooltipText = 'Not available';
  } else if (value === true) {
    symbol = '✓'; color = '#14B8A6'; fontSize = 16; tooltipText = 'Available';
  } else if (partial) {
    symbol = '◐'; color = '#F97316'; fontSize = 14; tooltipText = String(value);
  } else {
    symbol = '✓'; color = '#14B8A6'; fontSize = 16; tooltipText = String(value);
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span style={{ color, fontSize, cursor: 'help' }}>
        {symbol}
      </span>
      {visible && tooltipText && (
        <div style={{
          position: 'absolute',
          ...(placement === 'above' ? { bottom: 'calc(100% + 6px)' } : { top: 'calc(100% + 6px)' }),
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#111',
          border: '1px solid #444',
          borderRadius: 4,
          padding: '6px 10px',
          fontSize: 11,
          color: '#D0D0D0',
          whiteSpace: 'normal',
          lineHeight: 1.5,
          zIndex: 200,
          pointerEvents: 'none',
          minWidth: 140,
          maxWidth: 240,
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}>
          {tooltipText}
        </div>
      )}
    </div>
  );
}
