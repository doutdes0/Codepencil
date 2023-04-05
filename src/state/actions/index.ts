import { ActionType } from '../action-types';
import { CellTypes, Direction } from '../cell';
import { CellState } from '../reducers/cellsReducer';

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertCell {
  type: ActionType.INSERT_CELL;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}
export interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface BundleStart {
  type: ActionType.BUNDLE_START;
  payload: { id: string };
}
export interface BundleComplete {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface CreateThread {
  type: ActionType.CREATE_THREAD;
  payload: {
    name: string;
    description: string | null;
  };
}

export interface DeleteThread {
  type: ActionType.DELETE_THREAD;
  payload: string;
}

export type Action =
  | MoveCell
  | DeleteCell
  | InsertCell
  | UpdateCell
  | BundleStart
  | BundleComplete
  | CreateThread
  | DeleteThread;
