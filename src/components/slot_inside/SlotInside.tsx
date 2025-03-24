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
    setTimeout(() => {
      // for (let i = 0; i < 18; i++) {
      //   const divs = document.querySelectorAll(
      //     `[aria-label='${i.toString()}']`
      //   );
      //   divs.forEach((div) => div.remove());
      // }
      // const divs2 = document.querySelectorAll(`[aria-label='18']`);
      // // console.log(divs2);
      // divs2.forEach((div) =>
      //   div.animate(
      //     { transform: 'translateY(1800px)' },
      //     { duration: 2100, iterations: 1 }
      //   )
      // );
    }, 2100);
  }, [touched]);

  let arr: number[] = [
    touched < 2 ? slotsVariants : curValue.current,
    ...new Array(slotsVariants * 2)
      .fill(0)
      .map((_, i) => (i % slotsVariants) + 1),
  ];

  arr = shuffle(arr);

  setTimeout(() => {
    setFirstNumber(slotNumber[0], slotNumber[1], arr[arr.length - 1]);
    curValue.current = arr[arr.length - 1];
  }, rollDuration);

  return (
    <>
      <div className={styles.slot}>
        <motion.div
          layout
          ref={size}
          key={num}
          // animate={touched > 0 ? { translateY: slotsVariants * 2 * -100 } : {}}
          animate={
            touched > 0
              ? {
                  translateY:
                    slotsVariants *
                    2 *
                    -size.current!.getBoundingClientRect().width,
                }
              : {}
          }
          transition={{
            duration: rollDuration,
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
      </div>
    </>
  );
}
