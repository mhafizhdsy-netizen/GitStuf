
import React, { useState, useEffect, useRef } from 'react';
import { githubApi } from '../services/githubApi';
import { Content } from '../types';
import { Loader2, X, Download, File as FileIcon, Sparkles, Copy, Check } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import AIExplanationModal from './AIExplanationModal';
import { useSettings } from '../contexts/SettingsContext';
import { getLanguageFromFilename } from '../utils/languageUtils';

interface FileViewerProps {
  owner: string;
  repoName: string;
  file: Content;
  onClose: () => void;
  branch: string;
}

interface FileContentData extends Content {
  content?: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ owner, repoName, file, onClose, branch }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedText, setSelectedText] = useState('');
  const [buttonPosition, setButtonPosition] = useState<{ top: number; left: number } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { activeSyntaxTheme } = useSettings();

  useEffect(() => {
    setLoading(true);
    githubApi.getContents(owner, repoName, file.path, branch)
      .then(response => {
        if (Array.isArray(response.data)) {
          setContent('Error: Path is a directory, not a file.');
          return;
        }
        const fileData = response.data as FileContentData;
        if(fileData.content) {
          setContent(atob(fileData.content));
        } else {
          setContent('File content is too large to display.');
        }
      })
      .catch(() => setContent('Could not load file content.'))
      .finally(() => setLoading(false));
  }, [owner, repoName, file.path, branch]);

  // Handle selection logic for both mouse and touch
  useEffect(() => {
    const handleSelectionChange = () => {
        const selection = window.getSelection();
        
        // 1. Basic checks for valid selection
        if (!selection || selection.rangeCount === 0) {
            setSelectedText('');
            setButtonPosition(null);
            return;
        }

        // 2. Ensure selection is inside our content container
        if (!contentRef.current?.contains(selection.anchorNode)) {
             // This check is mostly handled by CSS 'select-none' on the container now,
             // but we keep it for safety.
             return;
        }
        
        const text = selection.toString().trim();
        
        if (text) {
            setSelectedText(text);
            
            // Only calculate position for desktop popup. 
            // Mobile will use a fixed bottom bar.
            if (window.matchMedia('(min-width: 768px)').matches) {
                try {
                    const range = selection.getRangeAt(0);
                    const rect = range.getBoundingClientRect();
                    const containerRect = contentRef.current.getBoundingClientRect();
                    
                    // Calculate relative position
                    setButtonPosition({
                        top: rect.top - containerRect.top - 40,
                        left: rect.left - containerRect.left + rect.width / 2,
                    });
                } catch (e) {
                    console.error("Error calculating selection position", e);
                    setButtonPosition(null);
                }
            } else {
                setButtonPosition(null); // Ensure floating button doesn't show on mobile
            }
        } else {
            setSelectedText('');
            setButtonPosition(null);
        }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);


  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  const isMarkdown = fileExtension === 'md';
  const isImage = ['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(fileExtension);
  
  // Use the utility to get the correct Prism language key
  const language = getLanguageFromFilename(file.name);

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin" size={32} /></div>;
    }
    if (!content) {
      return <p>No content to display.</p>;
    }
    if (isMarkdown) {
      // Wrap markdown in select-text cursor-text to allow selection
      return (
        <div className="select-text cursor-text">
            <MarkdownRenderer content={content} owner={owner} repoName={repoName} branch={branch} filePath={file.path} />
        </div>
      );
    }
    if (isImage) {
      return <img src={file.download_url!} alt={file.name} className="max-w-full h-auto rounded" />;
    }
    return (
      <div className="relative group">
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute top-2 right-2 z-10 flex items-center px-2 py-1 text-xs bg-base-200 dark:bg-base-700 hover:bg-base-300 dark:hover:bg-base-600 rounded-md transition opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          {copied ? <Check size={14} className="mr-1 text-green-500" /> : <Copy size={14} className="mr-1" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        {/* 
            CRITICAL FIX: 
            1. parent has select-none.
            2. SyntaxHighlighter needs userSelect: 'text' and cursor: 'text' to create a selection island.
            3. margin: 0 ensures the highlighter fills the selectable area without gaps.
        */}
        <SyntaxHighlighter
          language={language}
          style={activeSyntaxTheme}
          showLineNumbers
          wrapLines
          customStyle={{ margin: 0, paddingTop: '2.5rem', userSelect: 'text', cursor: 'text' }}
          codeTagProps={{ 
            style: { 
                fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace', 
                fontSize: '14px',
                userSelect: 'text'
            } 
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <>
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div 
            className="bg-white dark:bg-base-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative" 
            onClick={(e) => e.stopPropagation()}
        >
            <header className="flex items-center justify-between p-4 border-b border-base-200 dark:border-base-800">
            <div className="flex items-center text-sm font-semibold truncate text-gray-800 dark:text-gray-100">
                <FileIcon size={16} className="mr-2 text-gray-500" />
                <span className="truncate">{file.path}</span>
            </div>
            <div className="flex items-center space-x-2">
                {file.download_url && (
                <a href={file.download_url} download target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-base-100 dark:hover:bg-base-800 transition text-gray-600 dark:text-gray-300">
                    <Download size={18} />
                </a>
                )}
                <button onClick={onClose} className="p-2 rounded-full hover:bg-base-100 dark:hover:bg-base-800 transition text-gray-600 dark:text-gray-300">
                <X size={18} />
                </button>
            </div>
            </header>
            
            {/* 
                CRITICAL FIX: 
                Added `select-none cursor-default` to the container. 
                This prevents selection starting in padding, whitespace, or background.
                Child elements (Markdown/Code) override this with select-text.
            */}
            <div 
                className="p-4 overflow-auto relative flex-1 text-gray-800 dark:text-gray-200 select-none cursor-default" 
                ref={contentRef}
            >
                {renderContent()}
                
                {/* Desktop Floating Button */}
                {buttonPosition && selectedText && (
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setIsModalOpen(true)}
                        className="absolute flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-secondary rounded-lg shadow-lg animate-fade-in hover:bg-secondary/90 transition-transform hover:scale-105 z-20"
                        style={{ top: buttonPosition.top, left: buttonPosition.left, transform: 'translateX(-50%)' }}
                    >
                        <Sparkles size={14} className="mr-1.5" />
                        AI Explain
                    </button>
                )}
            </div>

            {/* Mobile Bottom Fixed Button */}
            {selectedText && (
               <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center z-20 animate-fade-in px-4">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-full shadow-xl"
                  >
                    <Sparkles size={18} className="mr-2" />
                    Explain Selection with AI
                  </button>
               </div>
            )}

        </div>
        </div>
        {isModalOpen && (
            <AIExplanationModal 
                codeSnippet={selectedText}
                onClose={() => setIsModalOpen(false)}
            />
        )}
    </>
  );
};

export default FileViewer;
