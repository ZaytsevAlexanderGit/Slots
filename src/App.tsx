import './App.css';
import { Slot } from './ui/Slot/Slot.tsx';
import { SlotsState } from './assets/stores/state.ts';
import { ClipLoader } from 'react-spinners';
import { GameChooseMenu } from './ui/GameChooseMenu/GameChooseMenu.tsx';
import { createInitialArrayComplex } from './shared/utils.ts';
import { SpinButton } from './ui/SpinButton/SpinButton.tsx';

function App() {
  const isLoading = SlotsState((state) => state.isLoading);

  const touched = SlotsState((state) => state.touched);
  const slotsSizeRow = SlotsState((state) => state.slotsSizeRow);
  const slotsSizeCol = SlotsState((state) => state.slotsSizeCol);

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
              <SpinButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
