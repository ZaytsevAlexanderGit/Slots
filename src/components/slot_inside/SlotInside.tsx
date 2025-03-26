import styles from './SlotInside.module.css';
import { motion } from 'motion/react';
import { getImgUrl } from '../../shared/utils.ts';
import { SlotsState } from '../../assets/stores/state.ts';
import { useEffect, useRef } from 'react';

interface ISlotLine {
  data: number[];
  slotNumber: number[];
  num: number;
}

export function SlotInside({ data, slotNumber, num }: ISlotLine) {
  const touched = SlotsState((state) => state.touched);
  const slotType = SlotsState((state) => state.type);
  const slotsVariants = SlotsState((state) => state.slotsVariants);
  const rollDuration = SlotsState((state) => state.rollDuration);

  const size = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (touched > 0) {
      setTimeout(
        () => {
          for (let i = 1; i <= 2 * slotsVariants; i++) {
            const divs = document.querySelectorAll(
              `[aria-label='${i.toString()}']`
            );
            divs.forEach((div) => div.remove());
          }
        },
        rollDuration * 1000 +
          (SlotsState.getState().slotsSizeRow +
            SlotsState.getState().slotsSizeCol -
            2) *
            100
      );
    }
  }, [touched]);

  return touched > 0 ? (
    <>
      <motion.div
        ref={size}
        key={num}
        animate={
          touched > 0
            ? {
                translateY: [
                  slotsVariants *
                    2 *
                    -size.current!.getBoundingClientRect().width,
                  0,
                ],
              }
            : {}
        }
        transition={{
          duration: rollDuration,
          times: [0, 1],
          delay: (slotNumber[0] + slotNumber[1]) / 10,
        }}
      >
        {data.map((item, index) => (
          <div
            className={styles.slot}
            key={index}
            aria-label={index.toString()}
          >
            <img
              className={styles.image}
              src={getImgUrl(slotType, `${slotType}-${item}`)}
              alt={`${slotType}-${item}`}
              // src={`./${slotType}-${item}.png`}
            />
          </div>
        ))}
      </motion.div>
    </>
  ) : (
    <div ref={size}>
      <div className={styles.slot}>
        <img
          className={styles.image}
          src={getImgUrl(slotType, `${slotType}-${slotsVariants}`)}
          alt={`${slotType}-${slotsVariants}`}
          // src={`./${slotType}-${item}.png`}
        />
      </div>
    </div>
  );
}
