import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  light?: boolean;
}

export function Card({ children, className = '', accentColor, light = false }: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: light ? '#ffffff' : '#111',
        border: light ? '1px solid #e0e0e0' : '1px solid #333',
        boxShadow: light ? '0 1px 4px rgba(0,0,0,0.07)' : undefined,
        padding: '16px',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: 0,
        boxSizing: 'border-box' as const,
        borderLeft: accentColor ? `4px solid ${accentColor}` : undefined,
      }}
    >
      {children}
    </div>
  );
}
