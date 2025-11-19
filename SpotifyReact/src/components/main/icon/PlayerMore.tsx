import React from 'react';

interface IPlayerMoreProps {
  className?: string,
  color?: string
}

const PlayerMore: React.FC<IPlayerMoreProps> = ({ className, color = "#8E0025" }) => {
  return (
    <svg
      width="5"
      height="24"
      viewBox="0 0 5 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.32843 4.29999C3.39434 4.29999 4.25845 3.4359 4.25845 2.37C4.25845 1.30409 3.39434 0.440002 2.32843 0.440002C1.26252 0.440002 0.398438 1.30409 0.398438 2.37C0.398438 3.4359 1.26252 4.29999 2.32843 4.29999Z"
        fill={color}
      />
      <path
        d="M2.32843 13.93C3.39434 13.93 4.25845 13.0659 4.25845 12C4.25845 10.9341 3.39434 10.07 2.32843 10.07C1.26252 10.07 0.398438 10.9341 0.398438 12C0.398438 13.0659 1.26252 13.93 2.32843 13.93Z"
        fill={color}
      />
      <path
        d="M2.32843 23.56C3.39434 23.56 4.25845 22.6959 4.25845 21.63C4.25845 20.5641 3.39434 19.7 2.32843 19.7C1.26252 19.7 0.398438 20.5641 0.398438 21.63C0.398438 22.6959 1.26252 23.56 2.32843 23.56Z"
        fill={color}
      />
    </svg>
  );
};

export default PlayerMore;
