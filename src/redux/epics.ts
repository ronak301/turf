import { combineEpics, Epic } from 'redux-observable';

import { exampleEpics } from './example';

export const epics: Epic = combineEpics(...exampleEpics);
