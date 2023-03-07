import * as React from "react";
export const MemoLogo = (props) => (
  <svg
    width="52px"
    height="28px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="none"
      stroke={`${props.fill}`}
      strokeWidth={2}
      d="M3,1 L3,23 L16,23 L21,18 L21,1 L3,1 Z M6,17 L11,17 M6,13 L18,13 M6,9 L16,9 M3,5 L21,5 M21,17 L15,17 L15,23"
    />
  </svg>
);
