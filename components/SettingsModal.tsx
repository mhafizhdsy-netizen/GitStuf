
import React, { useState, useEffect } from 'react';
import { X, KeyRound, Check, ExternalLink, Palette } from 'lucide-react';
import { useSettings, SYNTAX_THEMES, SyntaxThemeKey } from '../contexts/SettingsContext';

const SettingsModal: React.FC = () => {
  const { 
    token, 
    setToken, 
    isSettingsOpen, 
    closeSettingsModal,
    syntaxThemeKey,
    setSyntaxThemeKey
  } = useSettings();

  const [localToken, setLocalToken] = useState(token || '');
  const [localThemeKey, setLocalThemeKey] = useState<SyntaxThemeKey>(syntaxThemeKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isSettingsOpen) {
      setLocalToken(token || '');
      setLocalThemeKey(syntaxThemeKey);
      setSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingsOpen]);

  const handleSave = () => {
    const trimmedToken = localToken.trim();
    
    try {
      // 1. Save Token
      if (trimmedToken) {
        localStorage.setItem('github_pat', trimmedToken);
      } else {
        localStorage.removeItem('github_pat');
      }
      setToken(trimmedToken || null);

      // 2. Save Syntax Theme
      // We call the context setter which handles localStorage and State update
      setSyntaxThemeKey(localThemeKey);
      
      // 3. Show success
      setSaved(true);
      
      // 4. Force reload ONLY if token changed (to refresh API instances), 
      // otherwise just close or stay for feedback.
      // If only theme changed, we don't strictly need a reload, but for consistency we can.
      // However, theme changes are instant via Context, so let's only reload if Token changed.
      if (trimmedToken !== token) {
        setTimeout(() => {
            window.location.reload();
        }, 800);
      } else {
         setTimeout(() => {
             closeSettingsModal();
         }, 800);
      }

    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleSave();
    }
  };

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={closeSettingsModal}>
      <div 
        className="bg-white dark:bg-base-900 rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-5 border-b border-base-200 dark:border-base-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h2>
          <button onClick={closeSettingsModal} className="p-2 -m-2 rounded-full hover:bg-base-100 dark:hover:bg-base-800 transition text-gray-500 dark:text-gray-400">
            <X size={20} />
          </button>
        </header>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Token Section */}
          <div>
            <label htmlFor="github-token" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-base-200">
              GitHub Personal Access Token
            </label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="github-token"
                type="password"
                value={localToken}
                onChange={(e) => setLocalToken(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ghp_..."
                className="w-full pl-10 pr-4 py-2 border border-base-300 dark:border-base-700 rounded-lg bg-transparent focus:ring-2 focus:ring-primary focus:outline-none transition text-gray-800 dark:text-gray-100 placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-base-400 mt-2">
              Increases API rate limit from 60 to 5,000 reqs/hr.
            </p>
            <a 
              href="https://github.com/settings/tokens/new?scopes=public_repo&description=GitStuf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm text-primary dark:text-primary-light hover:underline mt-1"
            >
              Generate token <ExternalLink size={14} className="ml-1" />
            </a>
          </div>

          <div className="border-t border-base-200 dark:border-base-800"></div>

          {/* Theme Section */}
          <div>
            <label htmlFor="syntax-theme" className="block text-sm font-semibold mb-2 text-gray-700 dark:text-base-200">
              Code Syntax Highlighting
            </label>
            <div className="relative">
                <Palette size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                    id="syntax-theme"
                    value={localThemeKey}
                    onChange={(e) => setLocalThemeKey(e.target.value as SyntaxThemeKey)}
                    className="w-full pl-10 pr-8 py-2 border border-base-300 dark:border-base-700 rounded-lg bg-transparent focus:ring-2 focus:ring-primary focus:outline-none transition text-gray-800 dark:text-gray-100 appearance-none cursor-pointer"
                >
                    {Object.entries(SYNTAX_THEMES).map(([key, value]) => (
                        <option key={key} value={key} className="bg-white dark:bg-base-900 text-gray-800 dark:text-gray-100">
                            {value.name}
                        </option>
                    ))}
                </select>
                 {/* Custom Select Arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
             <p className="text-xs text-gray-500 dark:text-base-400 mt-2">
              Select your preferred color scheme for code blocks.
            </p>
          </div>
        </div>

        <footer className="px-6 py-4 bg-base-50 dark:bg-base-950/50 border-t border-base-200 dark:border-base-800 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center min-w-[120px]
                ${saved 
                  ? 'bg-green-500 text-white cursor-default transform scale-105' 
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
                }`}
            >
              {saved ? (
                <>
                  <Check size={18} className="mr-2" /> Saved
                </>
              ) : (
                'Save Changes'
              )}
            </button>
        </footer>
      </div>
    </div>
  );
};

export default SettingsModal;
