import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { createLogger } from 'redux-logger';

export function eventReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const reduxLogger: any = createLogger({
    collapsed: true,
  });
  let currentState: any;
  let store: any;

  return (state: any, action: Action) => {
    const newState = reducer(state, action);
    currentState = state;

    if (!store) {
      store = reduxLogger({
        getState: () => currentState,
      });
    }

    store(() => {
      currentState = newState;

      return newState;
    })(action);

    return newState;
  };
}

export const metaReducers: MetaReducer[] = [eventReducer];
