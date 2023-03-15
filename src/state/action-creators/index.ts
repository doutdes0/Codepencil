import { ActionType } from '../action-types';
import { UpdateCell, DeleteCell, MoveCell, InsertCell } from '../actions';
import { CellTypes, Direction } from '../cell';

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
