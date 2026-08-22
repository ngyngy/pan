import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  // Height sized to comfortably fit within the header without clipping text
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-13'
  };

  const imageUrl = "/logo-icon-clean.webp";
  const onlineFallback = "https://blog.ngy123.com/api/images/image/2026/08/4203c7b388213f34-052cb6c0-cf37-4726-9815-87818ae65465.webp";

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={imageUrl}
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src !== onlineFallback) {
            target.src = onlineFallback;
          }
        }}
        alt="网盘吧"
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
