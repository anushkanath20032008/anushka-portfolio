import React, { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ContentProvider } from './lib/content';
import { Desktop } from './desktop/Desktop';
import { MobileHome } from './desktop/MobileHome';
import { LockScreen } from './desktop/LockScreen';
import { FolderWindow } from './desktop/FolderWindow';
import { NowWindow } from './desktop/NowWindow';
import { SkimPage } from './pages/SkimPage';
import { clearUnlocked, readUnlocked, useIsDesktop, writeUnlocked } from './desktop/hooks';
import { PaintDefs } from './desktop/Paint';
import { WallpaperProvider } from './desktop/wallpaper';
import ClickSpark from './reactbits/ClickSpark';

const initialUnlocked = (path: string) => {
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  // Deep links, reduced-motion visitors and returning visitors go straight to the desktop.
  return reduced || path !== '/' || readUnlocked();
};

const Shell: React.FC = () => {
  const { pathname } = useLocation();
  const desktop = useIsDesktop();
  const [unlocked, setUnlocked] = useState(() => initialUnlocked(pathname));
  const unlock = () => {
    writeUnlocked();
    setUnlocked(true);
  };
  const lock = () => {
    clearUnlocked();
    setUnlocked(false);
  };

  return (
    <>
      {desktop ? (
        <ClickSpark sparkColor="#E8552F" sparkCount={9} sparkRadius={22} duration={500} disabled={!unlocked}>
          <Desktop unlocked={unlocked} onLock={lock} />
        </ClickSpark>
      ) : (
        <MobileHome />
      )}
      <Outlet />
      <AnimatePresence>{!unlocked && <LockScreen key="lock" onUnlock={unlock} />}</AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <PaintDefs />
      <WallpaperProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route path="/skim" element={<SkimPage />} />
          <Route path="/" element={<Shell />}>
            <Route path="f/:folder" element={<FolderWindow />} />
            <Route path="f/:folder/:entry" element={<FolderWindow />} />
            <Route path="now/:id" element={<NowWindow />} />
            <Route path="*" element={null} />
          </Route>
        </Routes>
      </BrowserRouter>
      </WallpaperProvider>
    </ContentProvider>
  );
}
