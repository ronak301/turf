import { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const portalSelector = useMemo(
    () => document.querySelector('#portal') ?? null,
    []
  );

  if (children && portalSelector) {
    return createPortal(children, portalSelector);
  }

  return null;
};

export default Portal;
