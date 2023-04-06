import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ActionType } from './action-types';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.CREATE_THREAD,
  payload: {
    id: 'test12',
    name: 'Test1',
    description: 'Test',
  },
});

store.dispatch({
  type: ActionType.INITIALIZE_CELLS,
  payload: 'test12',
});
console.log('just once');
