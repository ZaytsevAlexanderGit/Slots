import { SyntheticEvent } from 'react';
import styles from './MenuButton.module.css';
import cn from 'classnames';

interface IMenuButton {
  onClick: (evt: SyntheticEvent) => void;
  isActive: boolean;
}

export const MenuButton = ({ onClick, isActive }: IMenuButton) => {
  const size = 40;
  const color = 'white';

  const buttonClass = cn(styles.menu__button, {
    [styles.menu__button_active]: isActive,
  });

  return (
    <button onClick={onClick} className={buttonClass}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={cn(styles.first, {
            [styles.first_active]: isActive,
          })}
          d="M21.7129 7.55554H2.28713C2.09574 7.55554 2 7.46295 2 7.27777C2 7.09258 2.09574 7 2.28713 7H21.7129C21.9043 7 22 7.09258 22 7.27777C22 7.37036 21.9043 7.55554 21.7129 7.55554Z"
        />
        <path
          className={cn(styles.second, {
            [styles.second_active]: isActive,
          })}
          d="M21.7129 12.2779H2.28713C2.09574 12.2779 2 12.1854 2 12.0002C2 11.815 2.09574 11.7223 2.28713 11.7223H21.7129C21.9043 11.7223 22 11.815 22 12.0002C22 12.1854 21.9043 12.2779 21.7129 12.2779Z"
        />
        <path
          className={cn(styles.third, {
            [styles.third_active]: isActive,
          })}
          d="M21.7129 17H2.28713C2.09574 17 2 16.9074 2 16.7222C2 16.537 2.09574 16.4445 2.28713 16.4445H21.7129C21.9043 16.4445 22 16.537 22 16.7222C22 16.9074 21.9043 17 21.7129 17Z"
        />
      </svg>
    </button>
  );
};
