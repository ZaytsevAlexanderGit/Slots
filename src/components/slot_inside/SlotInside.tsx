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

  const checkIsGood: [boolean, number[]] = [false, [-1]];
  const colorsArray = ['red', 'blue', 'green', 'yellow', 'purple'];

  const timings: number[] = [];
  const colors: string[] = [];
  const scales: number[] = [];

  if (winingCells[0] !== undefined && winingCells[0].length > 1) {
    const winCheckVar = winingCells
      .map((elem) => {
        return elem.map((sub) => {
          return sub
            .toString()
            .includes([slotNumber[0], slotNumber[1]].toString());
        });
      })
      .map((el) => {
        return el.includes(true);
      });

    checkIsGood[0] = winCheckVar.includes(true);

    setTimeout(
      () => {
        const isWin = document.getElementsByClassName(
          `classToFind_${slotNumber[0]}_${slotNumber[1]}`
        );
        if (checkIsGood[0]) isWin![0].ariaLabel = 'win';
      },
      rollDuration * 1000 +
        (SlotsState.getState().slotsSizeRow +
          SlotsState.getState().slotsSizeCol -
          2) *
          100 +
        100
    );

    if (checkIsGood[0]) {
      checkIsGood[1] = winCheckVar
        .map((el, ind) => {
          if (el === true) return ind;
        })
        .filter((el) => el !== undefined);

      for (let i = 0; i < checkIsGood[1].length * 5; i++) {
        timings.push(
          (1 / checkIsGood[1].length) * Math.floor(i / 5) +
            (i % 5) / (4 * checkIsGood[1].length)
        );
        if (i % 5 === 4) {
          colors.push(
            `5px solid ${colorsArray[checkIsGood[1][Math.floor(i / 5)]]}`
          );
          scales.push(...[1, 1.05, 1.07, 1.1, 1.15]);
        } else colors.push('5px solid transparent');
      }
    }
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
        className={`classToFind_${slotNumber[0]}_${slotNumber[1]}`}
        // aria-label={checkIsGood[0] ? 'win' : ''}
      >
        {data.map((item, index) => (
          <motion.div
            className={styles.slot}
            key={index}
            aria-label={index.toString()}
            initial={{
              outlineOffset: '-10px',
              borderRadius: '50%',
              outline: '5px solid transparent',
            }}
            animate={
              index === 0 && checkIsGood[0]
                ? {
                    scale: scales,
                    outline: colors,

                    outlineOffset: '-10px',
                    borderRadius: '50%',
                  }
                : {
                    outlineOffset: '-10px',
                    borderRadius: '50%',
                    outline: '5px solid transparent',
                  }
            }
            transition={{
              // repeat: 3,
              duration: checkIsGood[1].length * 1.5,
              times: timings,
              delay: rollDuration + (slotNumber[0] + slotNumber[1] + 2) / 10,
            }}
          >
            <img
              className={styles.image}
              src={getImgUrl(slotType, `${slotType}-${item}`)}
              // src={`./${slotType}-${item}.png`}
              alt={`${slotType}-${item}`}
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
          // src={`./${slotType}-${slotsVariants}.png`}
          alt={`${slotType}-${slotsVariants}`}
        />
      </div>
    </div>
  );
}
