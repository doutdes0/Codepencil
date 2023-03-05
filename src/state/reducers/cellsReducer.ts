import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell, randomId } from '../cell';
import produce from 'immer';

interface CellState {
  data: { [id: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      break;

    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      break;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const i = state.order.findIndex((id) => id === action.payload.id);
      const targetI = direction === 'up' ? i + 1 : i - 1;
      if (targetI < 0 || targetI > state.order.length - 1) return;
      [state.order[i], state.order[targetI]] = [state.order[targetI], state.order[i]];
      break;

    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId(),
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex((id) => id === action.payload.id);
      if (index < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(index, 0, cell.id);
      }
      break;
    default:
      return state;
  }
}, initialState);

export default reducer;
