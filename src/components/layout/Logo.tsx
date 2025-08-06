import React from 'react';
import LogoImg from '../../assets/images/logos/TEQ-06.png';
import LogoImg2 from '../../assets/images/logos/TEQ-08.png';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-15 w-auto" }) => {
  return (
    <div className='flex items-center'>
      <img src={LogoImg} alt="Logo" className={className} />
      <img src={LogoImg2} alt="Logo" className={className} />
    </div>
  );
};

export default Logo;