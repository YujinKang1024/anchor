import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import Scene3D from './components/Scene3D/Scene3D';
import AboutModal from './components/AboutModal/AboutModal';
import PerspectiveModal from './components/PerspectiveModal/PerspectiveModal';
import MobileBlocker from './components/MobileBlocker/MobileBlocker';

// Google Analytics
function initializeGA() {
  if (typeof window !== 'undefined' && import.meta.env.PROD) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', import.meta.env.VITE_GA_TRACKING_ID);
  }
}

function trackPageView() {
  if (typeof window !== 'undefined' && window.gtag && import.meta.env.PROD) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
}

export default function App() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPerspectiveModalOpen, setIsPerspectiveModalOpen] = useState(false);

  useEffect(() => {
    initializeGA();
    trackPageView();
  }, []);

  function toggleAboutModal() {
    setIsAboutModalOpen(!isAboutModalOpen);
  }

  function togglePerspectiveModal() {
    setIsPerspectiveModalOpen(!isPerspectiveModalOpen);
  }

  if (isMobile) {
    return <MobileBlocker />;
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
