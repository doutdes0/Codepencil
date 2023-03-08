import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

//Enable proper type checking when accessing the store
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
