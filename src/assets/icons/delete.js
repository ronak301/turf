import React from 'react';

import theme from 'theme';

export default function DeleteIcon(props) {
  return (
    <svg
      width="11"
      height="14"
      viewBox="0 0 11 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.777778 12.4444C0.777778 13.3 1.47778 14 2.33333 14H8.55556C9.41111 14 10.1111 13.3 10.1111 12.4444V3.11111H0.777778V12.4444ZM2.69111 6.90667L3.78778 5.81L5.44444 7.45889L7.09333 5.81L8.19 6.90667L6.54111 8.55556L8.19 10.2044L7.09333 11.3011L5.44444 9.65222L3.79556 11.3011L2.69889 10.2044L4.34778 8.55556L2.69111 6.90667ZM8.16667 0.777778L7.38889 0H3.5L2.72222 0.777778H0V2.33333H10.8889V0.777778H8.16667Z"
        fill={props.fill || theme.colors.primary}
      />
    </svg>
  );
}
