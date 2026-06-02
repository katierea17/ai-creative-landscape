import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export function Card({ children, className = '', accentColor }: CardProps) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: '#242424',
        border: '1px solid #333',
        padding: '16px',
        borderRadius: '4px',
        borderLeft: accentColor ? `4px solid ${accentColor}` : undefined,
      }}
    >
      {children}
    </div>
  );
}
