import './App.css';
import { Slot } from './ui/Slot/Slot.tsx';
import { GameChooseMenu } from './ui/GameChooseMenu/GameChooseMenu.tsx';

function App() {
  return (
    <div className={'wrapper'}>
      <GameChooseMenu />
      <h1 className={'title'}>SLOTS</h1>
      <Slot />
    </div>
  );
}

export default App;
