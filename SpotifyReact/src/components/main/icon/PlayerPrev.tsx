import React from 'react';

interface PlayerPrevProps {
  className?: string;
}

const PlayerPrev: React.FC<PlayerPrevProps> = ({ className }) => {
  return (
    <svg
      width="23"
      height="17"
      viewBox="0 0 23 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.5881 0.690186L14.6481 5.27002V0.690186L0.828125 8.67017L14.6481 16.6401V12.0601L22.5881 16.6401V0.690186Z"
        fill="#8E0025"
      />
    </svg>
  );
};

export default PlayerPrev
