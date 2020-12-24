import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { ErrorBoundary } from 'components/tools';
import routes from 'routes';

const App = () => {
  return (
    <>
      <Helmet
        titleTemplate="%s | typescript-boilerplate"
        defaultTitle="typescript-boilerplate"
      />
      <Router>
              <ErrorBoundary fallback={<div>loading...</div>}>
            <Suspense fallback={<div>loading...</div>}>
              <Switch>
                <Route exact path="/" component={routes.Home} />
                <Route component={routes.NotFound} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
      </Router>
    </>
  );
};

export default App;
