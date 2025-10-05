import React from 'react';
import { RainbowTextProps } from '@/types/app/rainbow';

const RainbowText: React.FC<RainbowTextProps> = ({ 
  children, 
  className = '',
  ...props 
}) => {
  const combinedClassName = `font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-pink-500 animate-rainbow ${className}`;
  
  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

export default RainbowText;