import React from 'react';

import theme from 'theme';

export default function SetSubscription(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 12H0V14H8.75V12ZM14 4H0V6H14V4ZM0 10H14V8H0V10ZM0 0V2H14V0H0Z"
        fill={props.fill || theme.colors.primary}
      />
    </svg>
  );
}
