import { Action } from '../actions';
import { ActionType } from '../action-types';
import { randomId } from '../cell';
import { CellState, initialState as initailCellsState } from './cellsReducer';
import produce from 'immer';

interface Thread {
  id: string;
  name: string;
  description: string | null;
  cells: CellState;
}

interface ThreadState {
  data: {
    [id: string]: Thread;
  };
  error: string | null;
  loading: boolean;
}

const initialThreadsState = {
  data: {},
  error: null,
  loading: false,
};

const reducer = produce((state: ThreadState = initialThreadsState, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE_THREAD:
      const { name, description } = action.payload;
      const thread = {
        id: randomId(),
        name,
        description,
        cells: initailCellsState,
      };
      state.data[thread.id] = thread;
      break;

    case ActionType.DELETE_THREAD:
      delete state.data[action.payload];
      break;

    default:
      return state;
  }
}, initialThreadsState);

export default reducer;
