import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { reducers } from './reducers';
import { epics } from './epics';
import { isProduction } from 'utils';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = isProduction
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);

export { store };
