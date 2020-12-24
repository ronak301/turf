import { isSSR } from 'utils';

export const isDemo = () => {
  if (!isSSR) {
    const { hostname } = window.location;
    return Boolean(hostname.includes('isdemo.se'));
  }
};
