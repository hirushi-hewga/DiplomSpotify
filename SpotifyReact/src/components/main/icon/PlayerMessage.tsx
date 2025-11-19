import React from 'react';

interface IPlayerMessageProps {
  classname?: string;
  color?: string;
}

const PlayerMessage: React.FC<IPlayerMessageProps> = ({ classname, color = "#8E0025" }) => (
  <svg 
    width="19" 
    height="20" 
    viewBox="0 0 19 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={classname}>
    <path 
      d="M15.6699 0.290039H3.12988C1.39988 0.290039 0 1.69004 0 3.42004V12.8201C0 14.5501 1.39988 15.9501 3.12988 15.9501H5.3999L8.88989 18.9C9.17989 19.15 9.6099 19.15 9.8999 18.9L13.3899 15.9501H15.6599C17.3899 15.9501 18.7899 14.5501 18.7899 12.8201V3.42004C18.7899 1.69004 17.3899 0.290039 15.6599 0.290039H15.6699ZM18.09 12.6001C18.09 13.9401 17.0099 15.02 15.6699 15.02H14.09C13.52 15.02 12.9599 15.2201 12.5299 15.5901L9.84998 17.8501C9.59998 18.0701 9.21997 18.0701 8.96997 17.8501L6.09998 15.4301C5.78998 15.1601 5.38998 15.02 4.97998 15.02H3.1499C1.8099 15.02 0.72998 13.9401 0.72998 12.6001V3.54004C0.72998 2.20004 1.8099 1.12 3.1499 1.12H15.6799C17.0199 1.12 18.1 2.20004 18.1 3.54004V12.6001H18.09Z" 
      fill={color}
    />
    <path 
      d="M5.39062 4.59009H9.99072" 
      stroke="#8E0025" 
      stroke-miterlimit="10" 
      stroke-linecap="round"
    />
    <path 
      d="M5.39062 7.87H13.4807" 
      stroke="#8E0025" 
      stroke-miterlimit="10" 
      stroke-linecap="round"
    />
    <path 
      d="M5.39062 11.3301H13.4807" 
      stroke="#8E0025" 
      stroke-miterlimit="10" 
      stroke-linecap="round"
    />
  </svg>
);

export default PlayerMessage;