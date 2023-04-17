import { Action } from '../actions';
import { ActionType } from '../action-types';
import produce from 'immer';

export interface Thread {
  id: string;
  name: string;
  description: string | null;
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
      {
        const { name, description, id } = action.payload;
        const thread = {
          id,
          name,
          description,
        };
        state.data[thread.id] = thread;
      }
      break;

    case ActionType.UPDATE_THREAD:
      {
        const { name, description, id } = action.payload;
        state.data[id].name = name;
        state.data[id].description = description;
      }
      break;

    case ActionType.DELETE_THREAD:
      delete state.data[action.payload];

      break;

    default:
      return state;
  }
}, initialThreadsState);

export default reducer;
