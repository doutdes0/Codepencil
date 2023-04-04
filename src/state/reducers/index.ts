import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';
import threadsReducer from './threadsReducer';

const reducers = combineReducers({
  //Top-level state reference - `cells`, handled by `cellsReducer` etc
  cells: cellsReducer,
  bundles: bundlesReducer,
  threads: threadsReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
