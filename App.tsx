
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import RepoDetailPage from './pages/RepoDetailPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import { ThemeContext, Theme } from './contexts/ThemeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <SettingsProvider>
        <div className="min-h-screen text-gray-800 dark:text-base-200 bg-base-50 dark:bg-base-950 font-sans flex flex-col">
          <HashRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<HomePage />} />
              <Route path="/repo/:owner/:name/*" element={<RepoDetailPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </HashRouter>
          <SettingsModal />
        </div>
      </SettingsProvider>
    </ThemeContext.Provider>
  );
}
