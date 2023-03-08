import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';

const reducers = combineReducers({
  //Top-level state `cells`, handled by `cellsReducer`
  cells: cellsReducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
