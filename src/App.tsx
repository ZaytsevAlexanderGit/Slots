import './App.css';
import { Slot } from './ui/Slot/Slot.tsx';
import { SlotsState } from './assets/stores/state.ts';
import { ClipLoader } from 'react-spinners';
import { GameChooseMenu } from './ui/GameChooseMenu/GameChooseMenu.tsx';
import { createInitialArrayComplex } from './shared/utils.ts';

function App() {
  const isLoading = SlotsState((state) => state.isLoading);

  const touched = SlotsState((state) => state.touched);
  const increaseTouched = SlotsState((state) => state.increaseTouched);
  const slotsSizeRow = SlotsState((state) => state.slotsSizeRow);
  const slotsSizeCol = SlotsState((state) => state.slotsSizeCol);
  const rollDuration = SlotsState((state) => state.rollDuration);

  const arr = createInitialArrayComplex(slotsSizeRow, slotsSizeCol);

  return (
    <div className={'wrapper'}>
      <GameChooseMenu />
      <h1 className={'title'}>SLOTS</h1>
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
                  <Slot
                    slotNumber={[indRow, indCol]}
                    num={touched}
                    key={`${indRow}-${indCol}`}
                  />
                ))
              )}
              <button
                type="button"
                className={'button__spin'}
                onClick={(e) => {
                  if (e.target instanceof HTMLButtonElement) {
                    e.target.disabled = true;
                  }
                  increaseTouched();
                  setTimeout(
                    () => {
                      if (e.target instanceof HTMLButtonElement) {
                        e.target.disabled = false;
                      }
                    },
                    rollDuration * 1000 +
                      (slotsSizeCol + slotsSizeRow - 1) * 100
                  );
                }}
              >
                SPIN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
