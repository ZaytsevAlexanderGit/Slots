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

  const winingCells = SlotsState((state) => state.winingCells);

  let checkIsGood = false;

  if (winingCells[0] !== undefined && winingCells[0].length > 1) {
    checkIsGood = winingCells
      .map((elem) => {
        return elem.map((sub) => {
          return sub
            .toString()
            .includes([slotNumber[0], slotNumber[1]].toString());
        });
      })
      .map((el) => {
        return el.includes(true);
      })
      .includes(true);
  }

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
          <motion.div
            className={styles.slot}
            key={index}
            aria-label={index.toString()}
            animate={
              index === 0 && checkIsGood
                ? {
                    scale: [1, 1.05, 1, 1.1, 1.05],
                    outline: ['none', 'none', 'none', 'none', '5px solid red'],
                    outlineOffset: '-10px',
                    borderRadius: '50%',
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              times: [0, 0.25, 0.5, 0.75, 1],
              delay: rollDuration + (slotNumber[0] + slotNumber[1] + 2) / 10,
            }}
          >
            <img
              className={styles.image}
              src={getImgUrl(slotType, `${slotType}-${item}`)}
              alt={`${slotType}-${item}`}
              // src={`./${slotType}-${item}.png`}
            />
          </motion.div>
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
