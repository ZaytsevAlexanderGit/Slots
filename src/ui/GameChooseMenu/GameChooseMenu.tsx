import styles from './GameChooseMenu.module.css';
import { MenuButton } from '../MenuButton/MenuButton.tsx';
import { DropDownMenu } from '../DropDownMenu/DropDownMenu.tsx';
import { SyntheticEvent, useState } from 'react';

export function GameChooseMenu() {
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const handleClick = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    evt.preventDefault();
    setMenuActive(!menuActive);
  };

  return (
    <div className={styles.menu}>
      <MenuButton onClick={handleClick} isActive={menuActive} />
      <DropDownMenu setIsActive={setMenuActive} isActive={menuActive} />
    </div>
  );
}
