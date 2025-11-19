import React from 'react';

interface IPlayerPauseProps {
  className?: string;
}

const PlayerPause: React.FC<IPlayerPauseProps> = ({ className }) => (
  <svg 
    width="38" 
    height="38" 
    viewBox="0 0 38 38" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path 
      opacity="0.9" 
      d="M19.0831 0.52002C8.81313 0.52002 0.453125 8.88002 0.453125 19.15C0.453125 29.42 8.81313 37.78 19.0831 37.78C29.3531 37.78 37.7131 29.42 37.7131 19.15C37.7131 8.88002 29.3531 0.52002 19.0831 0.52002ZM17.5331 23.8101C17.5331 24.6701 16.8331 25.36 15.9831 25.36C15.1331 25.36 14.4331 24.6601 14.4331 23.8101V14.49C14.4331 13.63 15.1331 12.9399 15.9831 12.9399C16.8331 12.9399 17.5331 13.64 17.5331 14.49V23.8101ZM23.7431 23.8101C23.7431 24.6701 23.0431 25.36 22.1931 25.36C21.3431 25.36 20.6431 24.6601 20.6431 23.8101V14.49C20.6431 13.63 21.3431 12.9399 22.1931 12.9399C23.0431 12.9399 23.7431 13.64 23.7431 14.49V23.8101Z" 
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="0.443125" y1="19.16" x2="37.7131" y2="19.16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A30028" />
        <stop offset="1" stopColor="#FB2645" />
      </linearGradient>
    </defs>
  </svg>
);

export default PlayerPause;
