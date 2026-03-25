import { useState } from 'react';
import BootScreen from './components/BootScreen';
import MainMenu from './components/MainMenu';

function App() {
  const [showBoot, setShowBoot] = useState(true);

  return (
    <>
      {showBoot ? (
        <BootScreen onComplete={() => setShowBoot(false)} />
      ) : (
        <MainMenu />
      )}
    </>
  );
}

export default App;
