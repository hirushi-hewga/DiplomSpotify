import React from 'react';

interface IPlayerPlayProps {
  className?: string;
}

const PlayerPlay: React.FC<IPlayerPlayProps> = ({ className }) => {
  return (
    <svg
      width="53"
      height="54"
      viewBox="0 0 53 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        opacity="0.9"
        d="M28.0893 0.950003C12.3293 -0.0599972 -0.720672 12.99 0.289328 28.75C1.11933 41.75 11.6693 52.3 24.6793 53.14C40.4393 54.15 53.4893 41.1 52.4793 25.34C51.6493 12.34 41.0993 1.79 28.0893 0.950003ZM35.9793 31.13L24.6193 37.35C23.9093 37.75 23.1293 37.95 22.3493 37.95C21.4193 37.95 20.4793 37.67 19.6593 37.1C18.3593 36.2 17.6693 34.66 17.6693 33.08V21.01C17.6693 19.5 18.3093 18.01 19.5193 17.11C21.0493 15.96 23.0193 15.84 24.6493 16.76L35.9593 22.96C37.4793 23.81 38.3693 25.34 38.3693 27.05C38.3693 28.76 37.4793 30.29 35.9793 31.13Z"
        fill="url(#paint0_linear_512_58)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_512_58"
          x1="0.229328"
          y1="27.04"
          x2="52.5293"
          y2="27.04"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A30028" />
          <stop offset="1" stopColor="#FB2645" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PlayerPlay;
