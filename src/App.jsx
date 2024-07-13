import { useState } from 'react';
import Scene3D from './components/Scene3D/Scene3D';
import AboutModal from './components/AboutModal/AboutModal';
import PerspectiveModal from './components/PerspectiveModal/PerspectiveModal';

export default function App() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPerspectiveModalOpen, setIsPerspectiveModalOpen] = useState(false);

  function toggleAboutModal() {
    setIsAboutModalOpen(!isAboutModalOpen);
  }

  function togglePerspectiveModal() {
    setIsPerspectiveModalOpen(!isPerspectiveModalOpen);
  }

  return (
    <>
      {isAboutModalOpen && <AboutModal />}
      {isPerspectiveModalOpen && <PerspectiveModal />}
      <Scene3D
        toggleAboutModal={toggleAboutModal}
        togglePerspectiveModal={togglePerspectiveModal}
      />
    </>
  );
}
