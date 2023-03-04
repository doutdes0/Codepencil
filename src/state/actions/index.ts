import { ActionType } from '../action-types';
import { CellTypes, Direction } from '../cell';

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: { id: string; direction: Direction };
}
export interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertCell {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: { id: string; type: CellTypes };
}
export interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: { id: string; content: string };
}
export type Action = MoveCell | DeleteCell | InsertCell | UpdateCell;
