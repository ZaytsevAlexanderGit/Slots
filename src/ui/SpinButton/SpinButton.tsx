import { SlotsState } from '../../assets/stores/state.ts';

export function SpinButton() {
  const increaseTouched = SlotsState((state) => state.increaseTouched);
  const slotsSizeRow = SlotsState((state) => state.slotsSizeRow);
  const slotsSizeCol = SlotsState((state) => state.slotsSizeCol);
  const rollDuration = SlotsState((state) => state.rollDuration);

  return (
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
          rollDuration * 1000 + (slotsSizeCol + slotsSizeRow - 2) * 100
        );
      }}
    >
      SPIN
    </button>
  );
}
