import { Action } from '../actions';
import { ActionType } from '../action-types';
import produce from 'immer';

interface BundleState {
  [id: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const reducer = produce((state: BundleState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.id] = {
        loading: true,
        code: '',
        err: '',
      };
      break;

    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.id] = {
        loading: true,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
      break;

    default:
      return state;
  }
}, initialState);

export default reducer;
