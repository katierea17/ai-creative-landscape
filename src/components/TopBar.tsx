import { useState } from 'react';
import { lastUpdated } from '../data/competitorData';

export function TopBar() {
  const [updated, setUpdated] = useState(`Last updated: ${lastUpdated}`);
  const [editing, setEditing] = useState(false);

  return (
    <div
      style={{
        height: 56,
        background: '#f8f8f8',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 220,
        right: 0,
        zIndex: 9,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: '#111111' }}>
        AI Creative Market Landscape
      </span>
      {editing ? (
        <input
          autoFocus
          value={updated}
          onChange={e => setUpdated(e.target.value)}
          onBlur={() => setEditing(false)}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid #EB1000',
            color: '#777777',
            fontSize: 12,
            outline: 'none',
            fontFamily: 'inherit',
            width: 200,
            textAlign: 'right',
          }}
        />
      ) : (
        <span
          onClick={() => setEditing(true)}
          title="Click to edit"
          style={{
            color: '#777777',
            fontSize: 12,
            cursor: 'text',
            borderBottom: '1px solid transparent',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderBottomColor = '#444')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent')}
        >
          {updated}
        </span>
      )}
    </div>
  );
}
