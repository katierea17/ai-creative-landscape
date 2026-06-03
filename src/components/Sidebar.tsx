import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/may-2026', label: '⚡ Monthly Updates' },
  { path: '/four-p-shifts', label: 'Marketing Mix' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/credit-deep-dive', label: 'AI Credit Deep Dive' },
  { path: '/ai-messaging', label: 'AI Messaging' },
  { path: '/student-messaging', label: 'Student Messaging' },
  { path: '/customer-sentiment', label: 'Customer Sentiment' },
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
        background: '#1A1A1A',
        borderRight: '1px solid #333',
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
              color: isActive ? '#fff' : '#A0A0A0',
              textDecoration: 'none',
              borderLeft: isActive ? '3px solid #EB1000' : '3px solid transparent',
              background: isActive ? '#2a2a2a' : 'transparent',
              transition: 'all 0.12s',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.className.includes('active')) {
                el.style.color = '#fff';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.style.borderLeftColor.includes('EB1000')) {
                el.style.color = '#A0A0A0';
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
