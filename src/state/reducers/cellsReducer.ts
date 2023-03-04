import { Action } from '../actions';
import { ActionType } from '../action-types';
import { Cell } from '../cell';

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

const reducer = (state: CellState = initialState, action: Action): CellState => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      const { [action.payload]: remove, ...newData } = state.data;
      return {
        ...state,
        order: state.order.filter((id) => id !== action.payload),
        data: newData,
      };
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};
export default reducer;
