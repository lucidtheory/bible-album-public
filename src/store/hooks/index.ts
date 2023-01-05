import { TypedUseSelectorHook, useDispatch as useRawDispatch, useSelector as useRawSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store';

export const useDispatch = () => useRawDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useRawSelector;
