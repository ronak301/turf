import { useRef, useEffect, RefObject, useCallback } from 'react';

import { isSSR, getElement } from 'utils';

interface EventListenerProps {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefObject<Element> | Document | Window;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element = isSSR ? undefined : window,
  options
}: EventListenerProps) => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    const target = getElement(element);
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
