import * as React from "react";
export const AccountLogo = (props) => (
  <svg
    width="32px"
    height="28px"
    fill= ""
    viewBox="0 0 32 32"
    enableBackground="new 0 0 32 32"
    id="Stock_cut"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <desc />
    <g>
      <circle
        cx={16}
        cy={16}
        fill="none"
        r={15}
        stroke= {`${props.fill}`}
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={3}
      />
      <path
        d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
        fill="none"
        stroke={`${props.fill}`}
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
      <circle
        cx={16}
        cy={11}
        fill="none"
        r={6}
        stroke={`${props.fill}`}
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </g>
  </svg>
);
