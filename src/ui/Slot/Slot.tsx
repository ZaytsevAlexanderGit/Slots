import styles from './Slot.module.css';
import { SlotInside } from '../../components/slot_inside/SlotInside.tsx';

interface ISlot {
  slotNumber: number[];
  num: number;
}

export function Slot({ slotNumber, num }: ISlot) {
  return (
    <>
      <div className={styles.slot}>
        <SlotInside slotNumber={slotNumber} num={num} />
      </div>
    </>
  );
}
