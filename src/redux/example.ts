import { createSelector } from 'reselect';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ofType, Epic } from 'redux-observable';
import { of, from } from 'rxjs';
import { AxiosResponse } from 'axios';

import { ExampleService } from 'api';

// Constants
const TOGGLE_ACTIVE = 'example/TOGGLE_ACTIVE';
const FETCH_USER_START = 'example/FETCH_USER_START';
const FETCH_USER_SUCCESS = 'example/FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'example/FETCH_USER_ERROR';

// Types
interface ExampleAction {
  type: string;
  payload?: any; // 🙈
}

interface ExampleState {
  active: boolean;
  user: {
    name: string | null;
    loading: boolean;
    error: boolean;
  };
}

// Selectors
export const selectExample = (state: { example: ExampleState }) =>
  state.example;

export const selectActive = createSelector(
  [selectExample],
  ({ active }) => active
);

export const selectUser = createSelector([selectExample], ({ user }) => user);

// Actions
export const toggleActive = () => ({
  type: TOGGLE_ACTIVE
});

export const fetchUserStart = (id: number | string) => ({
  type: FETCH_USER_START,
  payload: id
});

export const fetchUserSuccess = (
  data: AxiosResponse<{ name: string }> | unknown
) => ({
  type: FETCH_USER_SUCCESS,
  payload: data
});

export const fetchUserError = () => ({
  type: FETCH_USER_ERROR
});

// Reducers
const initialState = {
  active: false,
  user: {
    name: null,
    loading: false,
    error: false
  }
};

export default (state: ExampleState = initialState, action: ExampleAction) => {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      return {
        ...state,
        active: !state.active
      };
    case FETCH_USER_START:
      return {
        ...state,
        user: {
          ...state.user,
          name: null,
          loading: true,
          error: false
        }
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
          loading: false,
          error: false
        }
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          name: null,
          loading: false,
          error: true
        }
      };
    default:
      return state;
  }
};

// Epics
const exampleEpic: Epic<ExampleAction, ExampleAction, ExampleState> = (
  action$
) =>
  action$.pipe(
    ofType(FETCH_USER_START),
    switchMap((action) =>
      from(ExampleService.getUserName$(action.payload)).pipe(
        map((response) => fetchUserSuccess(response)),
        catchError(() => of(fetchUserError()))
      )
    )
  );

export const exampleEpics = [exampleEpic];
