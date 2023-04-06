import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell, randomId } from '../cell';
import produce from 'immer';

export interface CellState {
  data: { [threadID: string]: { [cellID: string]: Cell } };
  loading: boolean;
  error: string | null;
  order: { [threadID: string]: string[] };
}

export const initialState: CellState = {
  data: {},
  loading: false,
  error: null,
  order: {},
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      {
        const { threadID, cellID } = action.payload;
        delete state.data[threadID][cellID];
        state.order[threadID] = state.order[threadID].filter((id) => id !== cellID);
      }
      break;

    case ActionType.UPDATE_CELL:
      {
        const { threadID, cellID, content } = action.payload;
        state.data[threadID][cellID].content = content;
      }
      break;

    case ActionType.MOVE_CELL:
      {
        const { threadID, cellID, direction } = action.payload;
        const i = state.order[threadID].findIndex((id) => id === cellID);
        const targetI = direction === 'up' ? i - 1 : i + 1;
        if (targetI < 0 || targetI > state.order[threadID].length - 1) return;
        [state.order[threadID][i], state.order[threadID][targetI]] = [
          state.order[threadID][targetI],
          state.order[threadID][i],
        ];
      }
      break;

    case ActionType.INSERT_CELL:
      {
        const { threadID, cellID, type } = action.payload;
        const cell: Cell = {
          content: '',
          type,
          id: randomId(),
        };
        state.data[threadID][cell.id] = cell;
        const i = state.order[threadID].findIndex((id) => id === cellID);
        if (i < 0) {
          state.order[threadID].unshift(cell.id);
        } else {
          state.order[threadID].splice(i + 1, 0, cell.id);
        }
      }
      break;

    case ActionType.INITIALIZE_CELLS:
      state.data[action.payload] = {};
      state.order[action.payload] = [];

      break;

    default:
      return state;
  }
}, initialState);

export default reducer;
