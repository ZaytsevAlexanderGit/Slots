import styles from './SlotInside.module.css';
import { motion } from 'motion/react';
import { getImgUrl, shuffle } from '../../shared/utils.ts';
import { SlotsState } from '../../assets/stores/state.ts';
import { useEffect, useRef } from 'react';

interface ISlotLine {
  slotNumber: number[];
  num: number;
}

export function SlotInside({ slotNumber, num }: ISlotLine) {
  const touched = SlotsState((state) => state.touched);
  const slotType = SlotsState((state) => state.type);
  const slotsVariants = SlotsState((state) => state.slotsVariants);
  const rollDuration = SlotsState((state) => state.rollDuration);
  const setFirstNumber = SlotsState((state) => state.setFirstNumber);

  const curValue = useRef<number>(-1);
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
            SlotsState.getState().slotsSizeCol) *
            100
      );
    }
  }, [touched]);

  let arr: number[] = [
    ...new Array(slotsVariants * 2)
      .fill(0)
      // .map((_, i) => (i % slotsVariants) + 1),
      .map(() => Math.ceil(Math.random() * slotsVariants)),
    touched < 2 ? slotsVariants : curValue.current,
  ];

  arr = shuffle(arr);

  if (touched > 0) {
    setTimeout(() => {
      setFirstNumber(slotNumber[0], slotNumber[1], arr[0]);
      curValue.current = arr[0];
    }, 10);
  }

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
        {arr.map((item, index) => (
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
              // alt={`${slotType}-${item}.png`}
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
          // alt={`${slotType}-${item}.png`}
        />
      </div>
    </div>
  );
}
