import { ActionType } from '../action-types';
import { CellTypes } from '../cell';

interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: { id: string; direction: 'up' | 'down' };
}
interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}
interface InsertCell {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: { id: string; type: CellTypes };
}
interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: { id: string; content: string };
}
export type Action = MoveCell | DeleteCell | InsertCell | UpdateCell;
