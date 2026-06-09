import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/may-2026', label: '⚡ Monthly Updates' },
  // { path: '/ai-messaging', label: 'AI Messaging' },  ← deprecated
  { path: '/student-messaging', label: 'Messaging' },
  { path: '/customer-sentiment', label: 'Customer Sentiment' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/credit-deep-dive', label: 'AI Credit Deep Dive' },
  { path: '/survey-data', label: 'Gen AI Survey Data' },
  { path: '/core-value-prop', label: 'Core Value Props' },
  { path: '/feature-playground', label: '🧪 Feature Overview Playground' },
  { path: '/e2e-experience', label: 'End-to-End Experience' },
  // { path: '/', label: 'Overview' },  ← hidden for now
];

export function Sidebar() {
  return (
    <nav
      style={{
        width: 220,
        minWidth: 220,
        background: '#f8f8f8',
        borderRight: '1px solid #e0e0e0',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'auto',
        zIndex: 10,
        paddingTop: 56,
      }}
    >
      <div style={{ paddingTop: 16 }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#111111' : '#333333',
              textDecoration: 'none',
              borderLeft: isActive ? '3px solid #EB1000' : '3px solid transparent',
              background: isActive ? '#f0f0f0' : 'transparent',
              transition: 'all 0.12s',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.className.includes('active')) {
                el.style.color = '#111111';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.style.borderLeftColor.includes('EB1000')) {
                el.style.color = '#333333';
              }
            }}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
