import React from 'react';

// Dandiya sticks crossed SVG graphic with bells, thread wraps, and festive patterns
export const CrossedDandiyaSticks: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-8 h-8", 
  size = 32 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Crossed Dandiya Sticks"
    >
      {/* Glow filter */}
      <defs>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="stick1" x1="10" y1="90" x2="90" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="75%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="stick2" x1="90" y1="90" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="25%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="75%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Dandiya Stick 1 (Diagonal Left to Right) */}
      <g filter="url(#goldGlow)">
        <rect 
          x="10" 
          y="46" 
          width="110" 
          height="8" 
          rx="4" 
          transform="rotate(-45 50 50)" 
          fill="url(#stick1)" 
          stroke="#78350f" 
          strokeWidth="1" 
        />
        {/* Ring bands */}
        <circle cx="28" cy="28" r="4" fill="#fef08a" />
        <circle cx="36" cy="36" r="4" fill="#ec4899" />
        <circle cx="64" cy="64" r="4" fill="#ec4899" />
        <circle cx="72" cy="72" r="4" fill="#fef08a" />
        {/* Ghungroo Bell tips */}
        <circle cx="18" cy="18" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
        <circle cx="82" cy="82" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
      </g>

      {/* Dandiya Stick 2 (Diagonal Right to Left) */}
      <g filter="url(#goldGlow)">
        <rect 
          x="10" 
          y="46" 
          width="110" 
          height="8" 
          rx="4" 
          transform="rotate(45 50 50)" 
          fill="url(#stick2)" 
          stroke="#78350f" 
          strokeWidth="1" 
        />
        {/* Ring bands */}
        <circle cx="72" cy="28" r="4" fill="#fef08a" />
        <circle cx="64" cy="36" r="4" fill="#10b981" />
        <circle cx="36" cy="64" r="4" fill="#10b981" />
        <circle cx="28" cy="72" r="4" fill="#fef08a" />
        {/* Ghungroo Bell tips */}
        <circle cx="82" cy="18" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
        <circle cx="18" cy="82" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
      </g>

      {/* Center Festive Gem */}
      <circle cx="50" cy="50" r="6" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
      <circle cx="50" cy="50" r="2.5" fill="#dc2626" />
    </svg>
  );
};

// Traditional Diya Flame SVG
export const FestiveDiya: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-6 h-6", 
  size = 24 
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Flame */}
      <path 
        d="M20 4C20 4 15 12 15 17C15 19.7614 17.2386 22 20 22C22.7614 22 25 19.7614 25 17C25 12 20 4 20 4Z" 
        fill="#f59e0b" 
      />
      <path 
        d="M20 9C20 9 17 14 17 17.5C17 19.1569 18.3431 20.5 20 20.5C21.6569 20.5 23 19.1569 23 17.5C23 14 20 9 20 9Z" 
        fill="#fef08a" 
      />
      {/* Clay Lamp Base */}
      <path 
        d="M8 22C8 28.6274 13.3726 34 20 34C26.6274 34 32 28.6274 32 22C32 21 30 20 20 20C10 20 8 21 8 22Z" 
        fill="#b45309" 
        stroke="#d97706" 
        strokeWidth="1.5" 
      />
      {/* Lamp stand */}
      <path d="M16 34H24V37H16V34Z" fill="#92400e" />
    </svg>
  );
};

// Decorative Rangoli Mandala Corner Accent
export const MandalaCorner: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} opacity="0.45">
      <circle cx="0" cy="0" r="90" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="70" stroke="#ec4899" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="50" stroke="#f59e0b" strokeWidth="1" />
      <circle cx="0" cy="0" r="30" stroke="#eab308" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M0 0 L60 0 A60 60 0 0 1 0 60 Z" fill="rgba(245, 158, 11, 0.05)" />
    </svg>
  );
};
