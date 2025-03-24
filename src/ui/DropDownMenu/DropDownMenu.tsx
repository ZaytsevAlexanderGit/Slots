import { useEffect, useRef } from 'react';

import styles from './DropDownMenu.module.css';
import cn from 'classnames';
import { toUpperFirstLetterCase } from '../../shared/utils.ts';
import { SlotType } from '../../assets/stores/slots-data/state.ts';
import { SlotsState } from '../../assets/stores/state.ts';

interface MenuProps {
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
}

export const DropDownMenu = ({ setIsActive, isActive }: MenuProps) => {
  const ref = useRef(null);

  const switchSlotsButtons: SlotType[] = ['numbers', 'jewels'];

  const resetTouched = SlotsState((state) => state.resetTouched);
  const type = SlotsState((state) => state.type);
  const changeType = SlotsState((state) => state.changeType);
  const setLoading = SlotsState((state) => state.setLoading);
  // const slotsSize = SlotsState((state) => state.slotsSize);
  // const rollDuration = SlotsState((state) => state.rollDuration);

  const closeByOverlay = (evt: MouseEvent) => {
    if (evt.target !== ref.current) {
      setIsActive(false);
    }
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    document.addEventListener('click', closeByOverlay);

    return () => {
      document.removeEventListener('keydown', closeByEsc);
      document.removeEventListener('click', closeByOverlay);
    };
  }, []);

  const sidebarContainerStyles = cn(styles.header__sidebar__container, {
    [styles.header__sidebar__container_active]: isActive,
  });

  return (
    <div className={sidebarContainerStyles} ref={ref}>
      {/*<div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
      {switchSlotsButtons.map((element, index) => (
        <button
          key={index}
          className="button"
          disabled={type === element}
          onClick={() => {
            setLoading(true);
            resetTouched();
            changeType(element);
            setTimeout(
              () => setLoading(false),
              500
              // rollDuration * 1000 + slotsSize * 100
            );
          }}
        >
          {toUpperFirstLetterCase(element)}
        </button>
      ))}
    </div>
    // </div>
  );
};
