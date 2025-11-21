import React from 'react';

interface PlayerNextProps {
  className?: string;
}

const PlayerNext: React.FC<PlayerNextProps> = ({ className }) => {
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
        d="M0.800781 16.6401L8.74078 12.0601V16.6401L22.5508 8.67017L8.74078 0.690186V5.27002L0.800781 0.690186V16.6401Z"
        fill="#8E0025"
      />
    </svg>
  );
};

export default PlayerNext