import styles from './Slot.module.css';
import { SlotInside } from '../../components/slot_inside/SlotInside.tsx';
import { ClipLoader } from 'react-spinners';
import { SpinButton } from '../SpinButton/SpinButton.tsx';
import { SlotsState } from '../../assets/stores/state.ts';
import {
  // checkWinningCombinations,
  createInitialArrayAllData,
  findWinningCombinations,
  setWinningDataToState,
} from '../../shared/utils.ts';

export function Slot() {
  const touched = SlotsState((state) => state.touched);
  const isLoading = SlotsState((state) => state.isLoading);

  const slotsSizeRow = SlotsState((state) => state.slotsSizeRow);
  const slotsSizeCol = SlotsState((state) => state.slotsSizeCol);

  const arr = createInitialArrayAllData(slotsSizeRow, slotsSizeCol);

  if (touched > 0) {
    setTimeout(() => {
      setWinningDataToState(arr);
      setTimeout(() => {
        // checkWinningCombinations(SlotsState.getState().firstNumbers);
        findWinningCombinations(SlotsState.getState().firstNumbers);
      }, 0);
    }, 0);
  }

  return (
    <>
      <div className={'content__wrapper'}>
        <div
          style={
            !isLoading
              ? {
                  display: 'grid',
                  gridTemplateColumns: `repeat(${slotsSizeCol},1fr)`,
                }
              : { display: 'grid', gridTemplate: '1fr' }
          }
          className={'slots'}
        >
          {isLoading ? (
            <ClipLoader
              color="#FFF"
              loading={isLoading}
              size={'300px'}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              {arr.map((row, indRow) =>
                row.map((data, indCol) => (
                  <div className={styles.slot} key={`${indRow}-${indCol}`}>
                    <SlotInside
                      data={data}
                      slotNumber={[indRow, indCol]}
                      num={touched}
                    />
                  </div>
                ))
              )}
              <SpinButton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
