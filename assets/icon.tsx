
import React from 'react';

export const GitStufIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="icon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path 
      d="M50 10 L85 30 V70 L50 90 L15 70 V30 Z" 
      fill="none" 
      stroke="url(#icon-grad)" 
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="10" fill="url(#icon-grad)" />
    <path d="M50 40 V20" stroke="url(#icon-grad)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="20" r="5" fill="url(#icon-grad)" />
    
    <path d="M58 55 L75 68" stroke="url(#icon-grad)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="75" cy="68" r="5" fill="url(#icon-grad)" />
    
    <path d="M42 55 L25 68" stroke="url(#icon-grad)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="25" cy="68" r="5" fill="url(#icon-grad)" />
  </svg>
);
