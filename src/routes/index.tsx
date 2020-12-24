import { lazy } from 'react';

export default {
  Home: lazy(() => import('./Home')),
  NotFound: lazy(() => import('./NotFound'))
};
