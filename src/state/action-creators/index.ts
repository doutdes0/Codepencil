import { Dispatch } from 'redux';
import {
  UpdateCell,
  DeleteCell,
  MoveCell,
  InsertCell,
  Action,
  DeleteThread,
  UpdateThread,
} from '../actions';
import bundle from '../../bundler';
import { ActionType } from '../action-types';
import { CellTypes, Direction } from '../cell';
import { randomId } from '../cell';

export const updateCell = (threadID: string, cellID: string, content: string): UpdateCell => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      threadID,
      cellID,
      content,
    },
  };
};

export const deleteCell = (threadID: string, cellID: string): DeleteCell => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      threadID,
      cellID,
    },
  };
};

export const moveCell = (threadID: string, cellID: string, direction: Direction): MoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      threadID,
      cellID,
      direction,
    },
  };
};

export const insertCell = (
  threadID: string,
  cellID: string | null,
  type: CellTypes
): InsertCell => {
  return {
    type: ActionType.INSERT_CELL,
    payload: {
      threadID,
      cellID,
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

export const createThread =
  (name: string, description: string | null) => (dispatch: Dispatch<Action>) => {
    const id = randomId();
    dispatch({
      type: ActionType.CREATE_THREAD,
      payload: {
        id,
        name,
        description,
      },
    });
    dispatch({
      type: ActionType.INITIALIZE_CELLS,
      payload: id,
    });
  };

export const deleteThread = (id: string): DeleteThread => {
  return {
    type: ActionType.DELETE_THREAD,
    payload: id,
  };
};

export const updateThread = (id: string, name: string, description: string): UpdateThread => {
  return {
    type: ActionType.UPDATE_THREAD,
    payload: {
      id,
      name,
      description,
    },
  };
};
