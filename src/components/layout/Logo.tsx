import React from 'react';
import LogoImg from '../../assets/images/logos/red_blanco.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-15 w-auto" }) => {
  return (
    <img src={LogoImg} alt="Logo" className={className} />
  );
};

export default Logo;