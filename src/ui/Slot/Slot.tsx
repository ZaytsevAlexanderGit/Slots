import styles from './Slot.module.css';
import { SlotInside } from '../../components/slot_inside/SlotInside.tsx';
import { ClipLoader } from 'react-spinners';
import { SpinButton } from '../SpinButton/SpinButton.tsx';
import { SlotsState } from '../../assets/stores/state.ts';
import { createInitialArrayComplex } from '../../shared/utils.ts';

export function Slot() {
  const isLoading = SlotsState((state) => state.isLoading);
  const touched = SlotsState((state) => state.touched);

  const slotsSizeRow = SlotsState((state) => state.slotsSizeRow);
  const slotsSizeCol = SlotsState((state) => state.slotsSizeCol);

  const arr = createInitialArrayComplex(slotsSizeRow, slotsSizeCol, 0);
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
              {arr.map((elem, indRow) =>
                elem.map((_, indCol) => (
                  <div className={styles.slot} key={`${indRow}-${indCol}`}>
                    <SlotInside slotNumber={[indRow, indCol]} num={touched} />
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
