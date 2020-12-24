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
        d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM9.527 4.438C10.276 4.438 10.878 5.04 10.878 5.789C10.878 6.538 10.276 7.14 9.527 7.14C8.778 7.14 8.176 6.538 8.176 5.789C8.169 5.04 8.778 4.438 9.527 4.438ZM5.327 3.332C6.237 3.332 6.979 4.074 6.979 4.984C6.979 5.894 6.237 6.636 5.327 6.636C4.417 6.636 3.675 5.894 3.675 4.984C3.675 4.067 4.41 3.332 5.327 3.332ZM5.327 9.723V12.348C3.647 11.823 2.317 10.528 1.729 8.876C2.464 8.092 4.298 7.693 5.327 7.693C5.698 7.693 6.167 7.749 6.657 7.847C5.509 8.456 5.327 9.261 5.327 9.723ZM7 12.6C6.811 12.6 6.629 12.593 6.447 12.572V9.723C6.447 8.729 8.505 8.232 9.527 8.232C10.276 8.232 11.571 8.505 12.215 9.037C11.396 11.116 9.373 12.6 7 12.6Z"
        fill={props.fill || theme.colors.primary}
      />
    </svg>
  );
}