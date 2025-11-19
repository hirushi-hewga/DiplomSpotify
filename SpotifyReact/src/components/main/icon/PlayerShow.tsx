import React from 'react';

interface IPlayerShowProps {
  classname?: string;
  color?: string;
}

const PlayerShow: React.FC<IPlayerShowProps> = ({ classname, color = "#8E0025" }) => (
  <svg 
    width="19" 
    height="21" 
    viewBox="0 0 19 21" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={classname}>
    <path 
      d="M1.47656 9.44995V1.28003" 
      stroke={color}
      strokeWidth="2" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
    />
    <path 
      d="M9.64661 1.28003H1.47656" 
      stroke={color}
      strokeWidth="2" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
    />
    <path 
      d="M17.0938 10.95V19.12" 
      stroke={color}
      strokeWidth="2" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
    />
    <path 
      d="M8.92188 19.12H17.0918" 
      stroke={color}
      strokeWidth="2" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
    />
  </svg>
);

export default PlayerShow;
