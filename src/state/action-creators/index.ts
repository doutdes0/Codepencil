import { Dispatch } from 'redux';
import {
  UpdateCell,
  DeleteCell,
  MoveCell,
  InsertCell,
  Action,
  CreateThread,
  DeleteThread,
} from '../actions';
import bundle from '../../bundler';
import { ActionType } from '../action-types';
import { CellTypes, Direction } from '../cell';
import { CellState } from '../reducers/cellsReducer';

export const updateCell = (id: string, content: string): UpdateCell => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCell => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCell = (id: string | null, type: CellTypes): InsertCell => {
  return {
    type: ActionType.INSERT_CELL,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (id: string, rawCode: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.BUNDLE_START,
    payload: { id },
  });

  const res = await bundle(rawCode);

  dispatch({
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      id,
      bundle: res,
    },
  });
};

export const createThread = (
  name: string,
  description: string | null,
  cells: CellState
): CreateThread => {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      name,
      description,
      cells,
    },
  };
};

export const deleteThread = (id: string): DeleteThread => {
  return {
    type: ActionType.DELETE_THREAD,
    payload: id,
  };
};
