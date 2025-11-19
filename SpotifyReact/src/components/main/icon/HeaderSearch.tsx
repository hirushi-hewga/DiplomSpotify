import React from 'react';

interface IHeaderSearchProps {
  className?: string;
  color?: string;
}

const HeaderSearch: React.FC<IHeaderSearchProps> = ({ className, color = "#FFFFFF" }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path d="M17.2906 15.92L13.1806 11.81C15.5906 8.85997 15.1606 4.50996 12.2106 2.09996C9.26063 -0.310036 4.91061 0.119965 2.50061 3.06997C0.0906111 6.01997 0.520582 10.37 3.47058 12.78C6.01058 14.86 9.66062 14.86 12.2006 12.78L16.3106 16.89C16.5806 17.15 17.0206 17.15 17.2806 16.87C17.5406 16.6 17.5406 16.18 17.2806 15.91L17.2906 15.92ZM7.85059 12.96C4.81059 12.96 2.34064 10.49 2.34064 7.44997C2.34064 4.40997 4.81059 1.93997 7.85059 1.93997C10.8906 1.93997 13.3606 4.40997 13.3606 7.44997C13.3606 10.49 10.8906 12.96 7.85059 12.96Z" 
      fill={color} />
    </svg>
  );
};

export default HeaderSearch;