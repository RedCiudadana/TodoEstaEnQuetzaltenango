import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60 12L12 100H108L60 12Z" fill="#E63946" />
      <path d="M60 30L30 90H90L60 30Z" fill="#FCBF49" />
      <path d="M60 48L48 80H72L60 48Z" fill="#2A9D8F" />
      <circle cx="60" cy="90" r="8" fill="#457B9D" />
      <path d="M30 90L40 70M50 90L60 70M70 90L80 70M90 90L100 70" stroke="#457B9D" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 95H95" stroke="#457B9D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;