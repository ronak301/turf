import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import { store } from 'redux/store';
import { App } from 'components/tools';
import { isProduction } from 'utils';
import { setupInterceptors } from 'api';
import 'styles/_global.scss';

if (isProduction && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    release: process.env.REACT_APP_SENTRY_RELEASE,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT
  });
}

setupInterceptors();

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
