
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { githubApi } from '../services/githubApi';
import { Repo } from '../types';
import RepoCard from '../components/RepoCard';
import { Search, ServerCrash, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/common/Header';
import { useSettings } from '../contexts/SettingsContext';

const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-base-900 p-5 rounded-2xl relative overflow-hidden shadow-sm border border-base-200 dark:border-base-800">
    <div className="space-y-3">
        <div className="h-5 bg-base-200 dark:bg-base-800 rounded-lg w-3/4"></div>
        <div className="space-y-2">
            <div className="h-3 bg-base-200 dark:bg-base-800 rounded-lg w-full"></div>
            <div className="h-3 bg-base-200 dark:bg-base-800 rounded-lg w-5/6"></div>
        </div>
        <div className="flex pt-2 space-x-4">
            <div className="h-4 bg-base-200 dark:bg-base-800 rounded-lg w-1/4"></div>
            <div className="h-4 bg-base-200 dark:bg-base-800 rounded-lg w-1/4"></div>
        </div>
    </div>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-base-100/50 dark:via-base-800/50 to-transparent"></div>
  </div>
);

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openSettingsModal } = useSettings();
  const initialQuery = searchParams.get('q') || 'react';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await githubApi.searchRepositories(searchTerm, 'stars', 'desc', page);
      setRepos(data.items);
      // Github API search limit is 1000 results. 12 per page = ~84 pages max.
      setTotalPages(Math.min(Math.ceil(data.total_count / 12), 84));
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        setError('API rate limit exceeded. Your token might be invalid or missing the `public_repo` scope.');
        openSettingsModal();
      } else {
        setError('Failed to fetch repositories.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, page, openSettingsModal]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
        setPage(1);
        setSearchTerm(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(2, page - 1);
    let end = Math.min(totalPages - 1, page + 1);

    // Add ellipsis before range if needed
    if (start > 2) {
        pages.push('...');
    }

    // Add pages in range
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    // Add ellipsis after range if needed
    if (end < totalPages - 1) {
        pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <div className="flex items-center space-x-1.5 overflow-x-auto p-2">
             <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1} 
                className="p-2 bg-white dark:bg-base-900 border border-base-300 dark:border-base-700 rounded-lg disabled:opacity-50 transition hover:bg-base-100 dark:hover:bg-base-800 disabled:hover:bg-white dark:disabled:hover:bg-base-900"
                aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {pages.map((p, index) => (
                <React.Fragment key={index}>
                    {p === '...' ? (
                        <span className="px-2 text-gray-500">...</span>
                    ) : (
                        <button
                            onClick={() => setPage(Number(p))}
                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg font-medium text-sm transition-colors border
                                ${page === p 
                                    ? 'bg-primary text-white border-primary shadow-sm' 
                                    : 'bg-white dark:bg-base-900 text-gray-700 dark:text-base-300 border-base-300 dark:border-base-700 hover:bg-base-100 dark:hover:bg-base-800'
                                }
                            `}
                        >
                            {p}
                        </button>
                    )}
                </React.Fragment>
            ))}

            <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages} 
                className="p-2 bg-white dark:bg-base-900 border border-base-300 dark:border-base-700 rounded-lg disabled:opacity-50 transition hover:bg-base-100 dark:hover:bg-base-800 disabled:hover:bg-white dark:disabled:hover:bg-base-900"
                aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
        </div>
    );
  };
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for repositories..."
                  className="w-full pl-12 pr-4 py-3 border border-base-300 dark:border-base-700 rounded-xl bg-white dark:bg-base-900 focus:ring-2 focus:ring-primary focus:outline-none transition text-gray-800 dark:text-gray-100"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </form>
        </div>

        {error && (
          <div className="text-center py-10 text-red-500 flex flex-col items-center">
            <ServerCrash size={48} className="mb-4" />
            <p className="text-lg">{error}</p>
            <p className="text-sm text-gray-500 dark:text-base-400 mt-2">The settings modal has been opened for you to add a valid token.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
          )}
        </div>

        {!loading && repos.length > 0 && (
          <div className="flex justify-center mt-12">
            {renderPagination()}
          </div>
        )}
      </main>
    </>
  );
}
