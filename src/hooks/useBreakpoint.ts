import { useEffect, useState, useCallback } from 'react';

import { useWindowSize } from 'hooks';
import { isSSR } from 'utils';

export const useBreakpoint = (): {
  current?: string;
  equal: (breakpoint: string) => boolean;
  min: (breakpoint: string) => boolean;
} => {
  const { width } = useWindowSize();
  const getCurrentBreakpoint = useCallback(
    () =>
      isSSR
        ? undefined
        : window
            .getComputedStyle(document.body, '::after')
            .content.replace(/"/g, ''),
    []
  );
  const getAllBreakpoints = useCallback(
    () =>
      isSSR
        ? undefined
        : window
            .getComputedStyle(document.body, '::before')
            .content.replace(/"/g, '')
            .split(', '),
    []
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getCurrentBreakpoint
  );

  const equal = useCallback(
    (breakpoint: string) => breakpoint === currentBreakpoint,
    [currentBreakpoint]
  );

  const min = useCallback(
    (breakpoint: string) => {
      const allBreakpoints = getAllBreakpoints();

      if (allBreakpoints?.includes(breakpoint)) {
        const currentBreakpointIndex = allBreakpoints.findIndex(
          (bp) => bp === currentBreakpoint
        );
        const breakpointIndex = allBreakpoints.findIndex(
          (bp) => bp === breakpoint
        );

        return currentBreakpointIndex >= breakpointIndex;
      }

      return false;
    },
    [currentBreakpoint, getAllBreakpoints]
  );

  useEffect(() => {
    setCurrentBreakpoint(getCurrentBreakpoint);
  }, [width, getCurrentBreakpoint]);

  return {
    current: currentBreakpoint,
    equal,
    min
  };
};
