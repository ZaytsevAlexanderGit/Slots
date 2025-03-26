import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  createRPSSlice,
  SlotsGameAction,
  SlotsGameState,
} from './slots-data/state.ts';
import { createInitialArrayComplex } from '../../shared/utils.ts';

export const SlotsState = create<SlotsGameState & SlotsGameAction>()(
  devtools((...args) => ({
    ...createRPSSlice(...args),
  }))
);

SlotsState.setState({
  firstNumbers: createInitialArrayComplex(
    SlotsState.getState().slotsSizeRow,
    SlotsState.getState().slotsSizeCol,
    SlotsState.getState().slotsVariants
  ),
});
