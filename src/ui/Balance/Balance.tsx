import { SlotsState } from '../../assets/stores/state.ts';

export function Balance() {
  const balance = SlotsState((state) => state.balance);

  return (
    <div>
      <h1>Score:{balance}</h1>
    </div>
  );
}
