import React from 'react';

interface IPlayerSearchProps {
  className?: string;
  color?: string;
}

const PlayerSearch: React.FC<IPlayerSearchProps> = ({ className, color = "#8E0025" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.8794 22L18.1194 16.24C21.4994 12.11 20.8894 6.01001 16.7594 2.63001C12.6294 -0.749995 6.5294 -0.140009 3.1494 3.98999C-0.230598 8.11999 0.379418 14.22 4.50942 17.6C8.06942 20.51 13.1894 20.51 16.7494 17.6L22.5094 23.36C22.8894 23.73 23.4994 23.72 23.8694 23.34C24.2294 22.97 24.2294 22.37 23.8694 22H23.8794ZM10.6494 17.86C6.3794 17.86 2.9294 14.4 2.9294 10.14C2.9294 5.88002 6.3894 2.42001 10.6494 2.42001C14.9094 2.42001 18.3694 5.88002 18.3694 10.14C18.3694 14.4 14.9094 17.86 10.6494 17.86Z"
        fill={color}
      />
    </svg>
  );
};

export default PlayerSearch;
