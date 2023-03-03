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
      return state;
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};
export default reducer;
