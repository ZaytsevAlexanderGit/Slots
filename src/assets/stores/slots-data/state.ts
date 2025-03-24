import { StateCreator } from 'zustand/index';

export type SlotType = 'numbers' | 'jewels';

export interface SlotsGameState {
  type: SlotType;
  touched: number;
  isAnimated: boolean;
  slotsVariants: number;
  slotsSizeRow: number;
  slotsSizeCol: number;
  firstNumbers: number[][];
  rollDuration: number;
  isLoading: boolean;
}

export interface SlotsGameAction {
  changeType: (type: SlotType) => void;
  resetTouched: () => void;
  increaseTouched: () => void;
  setLoading: (loading: boolean) => void;
  setIsAnimated: (status: boolean) => void;
  setFirstNumber: (indexRow: number, indexCol: number, data: number) => void;
  setAllFirstNumber: (data: number[][]) => void;
}

export const createRPSSlice: StateCreator<
  SlotsGameState & SlotsGameAction,
  [],
  [],
  SlotsGameState & SlotsGameAction
> = (set) => ({
  type: 'numbers',
  isAnimated: false,
  touched: 0,
  isLoading: false,
  slotsVariants: 9,
  slotsSizeRow: 3,
  slotsSizeCol: 5,
  firstNumbers: [[0]],
  rollDuration: 1.5,
  changeType: (type: SlotType) => set(() => ({ type: type })),
  increaseTouched: () => set((state) => ({ touched: state.touched + 1 })),
  resetTouched: () => set(() => ({ touched: 0 })),
  setLoading: (loading) => set(() => ({ isLoading: loading })),
  setIsAnimated: (status) => set(() => ({ isAnimated: status })),
  setFirstNumber: (indexRow: number, indexCol: number, data: number) =>
    set((state) => ({
      firstNumbers: [
        ...state.firstNumbers.slice(0, indexRow),
        [
          ...state.firstNumbers[indexRow].slice(0, indexCol),
          data,
          ...state.firstNumbers[indexRow].slice(indexCol + 1),
        ],
        ...state.firstNumbers.slice(indexRow + 1),
      ],
    })),
  setAllFirstNumber: (data: number[][]) =>
    set(() => ({
      firstNumbers: data,
    })),
});
