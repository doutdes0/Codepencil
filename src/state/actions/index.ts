import { ActionType } from '../action-types';
import { CellTypes, Direction } from '../cell';
import { CellState } from '../reducers/cellsReducer';

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    threadID: string;
    cellID: string;
    direction: Direction;
  };
}
export interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: {
    threadID: string;
    cellID: string;
  };
}
export interface InsertCell {
  type: ActionType.INSERT_CELL;
  payload: {
    threadID: string;
    cellID: string | null;
    type: CellTypes;
  };
}
export interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: {
    threadID: string;
    cellID: string;
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
    id: string;
    name: string;
    description: string | null;
  };
}

export interface DeleteThread {
  type: ActionType.DELETE_THREAD;
  payload: string;
}

export interface UpdateThread {
  type: ActionType.UPDATE_THREAD;
  payload: {
    id: string;
    name: string;
    description: string | null;
  };
}

export interface InitializeCells {
  type: ActionType.INITIALIZE_CELLS;
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
  | DeleteThread
  | InitializeCells
  | UpdateThread;
