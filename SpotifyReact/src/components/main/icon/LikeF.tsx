import React from 'react';

const LikeF: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="34"
        height="34"
        viewBox="0 0 27 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M19.2895 0.019989C16.8695 0.059989 14.6595 1.39 13.4895 3.5C12.3195 1.38 10.1095 0.059989 7.68949 0.019989C3.74949 0.189989 0.67949 3.50999 0.82949 7.45999C0.82949 14.61 12.3895 22.86 12.8795 23.21L13.4895 23.64L14.0995 23.21C14.5895 22.86 26.1495 14.6 26.1495 7.45999C26.2995 3.51999 23.2395 0.189989 19.2895 0.019989Z"
            fill="url(#paint0_linear_512_54)"
        />
        <defs>
            <linearGradient
                id="paint0_linear_512_54"
                x1="0.81949"
                y1="11.83"
                x2="26.1495"
                y2="11.83"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#A30028" />
                <stop offset="1" stopColor="#FB2645" />
            </linearGradient>
        </defs>
    </svg>
);

export default LikeF;
