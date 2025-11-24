
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { githubApi } from '../services/githubApi';
import { Content, Branch } from '../types';
import { Loader2, ArrowLeft, GitBranch, ChevronDown, Check, Search } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';
import { formatFileSize } from '../utils/formatters';
import FileViewer from './FileViewer';

interface FileExplorerProps {
  owner: string;
  name: string;
  path: string;
  branch: string;
  branches: Branch[];
}

const FileExplorer: React.FC<FileExplorerProps> = ({ owner, name, path, branch, branches }) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<Content | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [branchSearchTerm, setBranchSearchTerm] = useState('');
  const [fileSearchTerm, setFileSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setFileSearchTerm(''); // Reset file search on path change
    githubApi.getContents(owner, name, path, branch)
      .then(response => {
        if (!Array.isArray(response.data)) {
          // This path is a file, navigate to blob view
          navigate(`/repo/${owner}/${name}/blob/${branch}/${path}`, { replace: true });
          return;
        }
        const sortedContents = response.data.sort((a, b) => {
          if (a.type === 'dir' && b.type === 'file') return -1;
          if (a.type === 'file' && b.type === 'dir') return 1;
          return a.name.localeCompare(b.name);
        });
        setContents(sortedContents);
      })
      .catch(err => {
        setError('Could not fetch file contents.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [owner, name, path, branch, navigate]);
  
  const handleBranchSelect = (newBranch: string) => {
    setIsDropdownOpen(false);
    setBranchSearchTerm('');
    if (newBranch !== branch) {
      navigate(`/repo/${owner}/${name}/tree/${newBranch}`);
    }
  };

  const filteredBranches = branches.filter(b => b.name.toLowerCase().includes(branchSearchTerm.toLowerCase()));

  const filteredContents = contents.filter(item =>
    item.name.toLowerCase().includes(fileSearchTerm.toLowerCase())
  );

  const breadcrumbs = path.split('/').filter(Boolean);

  const handleFileClick = (file: Content) => {
    navigate(`/repo/${owner}/${name}/blob/${branch}/${file.path}`);
    setSelectedFile(file);
  }
  
  const closeFileViewer = () => {
    navigate(`/repo/${owner}/${name}/tree/${branch}/${path}`);
    setSelectedFile(null);
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin" size={32} /></div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="border border-base-200 dark:border-base-700 rounded-lg">
      <div className="p-3 bg-base-50 dark:bg-base-900 border-b border-base-200 dark:border-base-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
          
          {/* Branch Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-base-800 border border-base-300 dark:border-base-700 rounded-lg hover:bg-base-100 dark:hover:bg-base-700 transition-colors group shadow-sm"
              title="Switch branch"
            >
              <GitBranch size={14} className="text-gray-500 group-hover:text-primary transition-colors" />
              <span className="truncate max-w-[90px] text-gray-700 dark:text-base-300">{branch}</span>
              <ChevronDown size={12} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-64 origin-top-left rounded-lg bg-white dark:bg-base-900 shadow-xl border border-base-200 dark:border-base-700 focus:outline-none animate-fade-in">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Find a branch..."
                    value={branchSearchTerm}
                    onChange={e => setBranchSearchTerm(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-base-300 dark:border-base-700 rounded-md bg-base-50 dark:bg-base-800 focus:ring-2 focus:ring-primary focus:outline-none"
                    autoFocus
                  />
                </div>
                <ul className="max-h-56 overflow-y-auto">
                  {filteredBranches.map(b => (
                    <li key={b.name}>
                      <button
                        onClick={() => handleBranchSelect(b.name)}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-base-100 dark:hover:bg-base-800 flex items-center justify-between transition-colors"
                      >
                        <span className="truncate">{b.name}</span>
                        {b.name === branch && <Check size={14} className="text-primary" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 min-w-0 overflow-hidden">
            <Link to={`/repo/${owner}/${name}/tree/${branch}`} className="hover:underline text-primary font-semibold flex-shrink-0 ml-1">{name}</Link>
            {breadcrumbs.length > 0 && <span className="mx-2">/</span>}
            <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  <Link
                    to={`/repo/${owner}/${name}/tree/${branch}/${breadcrumbs.slice(0, i + 1).join('/')}`}
                    className="hover:underline text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
                  >
                    {crumb}
                  </Link>
                  {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            value={fileSearchTerm}
            onChange={e => setFileSearchTerm(e.target.value)}
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs border border-base-300 dark:border-base-700 rounded-md bg-white dark:bg-base-800 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div>
        {path && (
          <Link
            to={`/repo/${owner}/${name}/tree/${branch}/${path.substring(0, path.lastIndexOf('/'))}`}
            className="flex items-center p-2.5 text-sm hover:bg-base-100 dark:hover:bg-base-800 transition-colors border-b border-base-200 dark:border-base-700"
          >
            <ArrowLeft size={16} className="mr-2 text-primary" />
            <span className="text-primary font-medium">..</span>
          </Link>
        )}
        
        {filteredContents.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {contents.length > 0 ? 'No files matching your search.' : 'This directory is empty.'}
          </div>
        )}

        {filteredContents.map(item => (
          <div
            key={item.sha}
            onClick={() => item.type === 'file' ? handleFileClick(item) : navigate(`/repo/${owner}/${name}/tree/${branch}/${item.path}`)}
            className="flex items-center justify-between p-2.5 text-sm hover:bg-base-50 dark:hover:bg-base-800/50 transition-colors cursor-pointer border-b border-base-200 dark:border-base-700 last:border-b-0 group"
          >
            <div className="flex items-center truncate min-w-0">
              <span className="mr-3 flex-shrink-0">{getFileIcon(item.name, item.type)}</span>
              <span className="truncate group-hover:text-primary transition-colors">{item.name}</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs hidden md:block ml-4 flex-shrink-0 font-mono">
              {item.type === 'file' && formatFileSize(item.size)}
            </div>
          </div>
        ))}
      </div>
      {selectedFile && (
        <FileViewer
          owner={owner}
          repoName={name}
          file={selectedFile}
          onClose={closeFileViewer}
          branch={branch}
        />
      )}
    </div>
  );
};

export default FileExplorer;
