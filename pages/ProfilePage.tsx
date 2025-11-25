import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { githubApi } from '../services/githubApi';
import { UserProfile, Repo } from '../types';
import { Loader2, Users, MapPin, Link as LinkIcon, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RepoCard from '../components/RepoCard';
import ErrorDisplay from '../components/common/ErrorDisplay';
import { formatNumber } from '../utils/formatters';

const ProfilePageSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-8 mb-12">
                <div className="w-40 h-40 rounded-full bg-base-200 dark:bg-base-800 flex-shrink-0"></div>
                <div className="flex-1 w-full space-y-4">
                    <div className="h-8 bg-base-200 dark:bg-base-800 rounded-lg w-1/2 mx-auto md:mx-0"></div>
                    <div className="h-5 bg-base-200 dark:bg-base-800 rounded-lg w-1/3 mx-auto md:mx-0"></div>
                    <div className="h-4 bg-base-200 dark:bg-base-800 rounded-lg w-full max-w-lg mx-auto md:mx-0"></div>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <div className="h-5 bg-base-200 dark:bg-base-800 rounded-lg w-24"></div>
                        <div className="h-5 bg-base-200 dark:bg-base-800 rounded-lg w-24"></div>
                    </div>
                </div>
            </div>
            <div className="h-8 bg-base-200 dark:bg-base-800 rounded-lg w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="h-36 bg-base-200 dark:bg-base-800 rounded-2xl"></div>
                ))}
            </div>
        </div>
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-base-100/50 dark:via-base-800/50 to-transparent"></div>
    </div>
);

const RepoListSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="relative overflow-hidden h-44 bg-white dark:bg-base-900 rounded-2xl border border-base-200 dark:border-base-800">
                <div className="space-y-3 p-5">
                    <div className="h-5 bg-base-200 dark:bg-base-800 rounded-lg w-3/4"></div>
                    <div className="h-3 bg-base-200 dark:bg-base-800 rounded-lg w-full"></div>
                    <div className="h-3 bg-base-200 dark:bg-base-800 rounded-lg w-5/6"></div>
                </div>
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-base-100/50 dark:via-base-800/50 to-transparent"></div>
            </div>
        ))}
    </div>
);

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const [searchParams, setSearchParams] = useSearchParams();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [error, setError] = useState<any>(null);

    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);

    // Effect to fetch the main user profile data
    useEffect(() => {
        if (!username) return;

        setLoadingProfile(true);
        setError(null);
        setRepos([]);
        setPage(parseInt(searchParams.get('page') || '1', 10)); // Reset page on user change

        const fetchProfile = async () => {
            try {
                const profileRes = await githubApi.getUserProfile(username);
                setProfile(profileRes.data);
                const totalRepos = profileRes.data.public_repos;
                // GitHub API pagination limit for this endpoint seems to be around 100 pages.
                setTotalPages(Math.min(Math.ceil(totalRepos / 12), 100));
            } catch (err: any) {
                setError(err);
                console.error(err);
            } finally {
                setLoadingProfile(false);
            }
        }
        fetchProfile();
    }, [username]);

    // Effect to fetch repositories for the current page
    useEffect(() => {
        if (!username || !profile) return; // Wait until profile is loaded
        
        setLoadingRepos(true);

        const fetchRepos = async () => {
            try {
                const reposRes = await githubApi.getUserRepos(username, page);
                setRepos(reposRes.data);
                // Only scroll to top on page change, not initial load
                if (page !== initialPage || searchParams.get('page')) {
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (err) {
                 setError(err);
                 console.error("Failed to fetch repos", err);
            } finally {
                setLoadingRepos(false);
            }
        };
        fetchRepos();
    }, [username, page, profile]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setSearchParams({ page: newPage.toString() });
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;
    
        const pages = [];
        pages.push(1);
    
        let start = Math.max(2, page - 1);
        let end = Math.min(totalPages - 1, page + 1);
    
        if (start > 2) pages.push('...');
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);
    
        return (
            <div className="flex items-center space-x-1.5 overflow-x-auto p-2">
                 <button 
                    onClick={() => handlePageChange(Math.max(1, page - 1))} 
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
                                onClick={() => handlePageChange(Number(p))}
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
                    onClick={() => handlePageChange(Math.min(totalPages, page + 1))} 
                    disabled={page === totalPages} 
                    className="p-2 bg-white dark:bg-base-900 border border-base-300 dark:border-base-700 rounded-lg disabled:opacity-50 transition hover:bg-base-100 dark:hover:bg-base-800 disabled:hover:bg-white dark:disabled:hover:bg-base-900"
                    aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
            </div>
        );
      };

    if (loadingProfile) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                   <ProfilePageSkeleton />
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-col justify-center items-center flex-grow text-center">
                 <ErrorDisplay error={error} onRetry={() => window.location.reload()} fullScreen />
                 <Link to="/" className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Go back home</Link>
              </div>
              <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-8 mb-12">
                    <img src={profile.avatar_url} alt={profile.login} className="w-40 h-40 rounded-full border-4 border-white dark:border-base-900 shadow-lg" />
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                        <h2 className="text-xl text-gray-500 dark:text-base-400 mb-4">@{profile.login}</h2>
                        <p className="max-w-xl mx-auto md:mx-0 text-base">{profile.bio}</p>
                        <div className="flex items-center justify-center md:justify-start space-x-6 text-gray-600 dark:text-base-300 mt-4">
                            <span className="flex items-center">
                                <Users size={16} className="mr-1.5" />
                                <strong>{formatNumber(profile.followers)}</strong>&nbsp;followers
                            </span>
                            <span className="flex items-center">
                                <strong>{formatNumber(profile.following)}</strong>&nbsp;following
                            </span>
                        </div>
                        <div className="flex flex-col items-center md:items-start space-y-2 text-gray-600 dark:text-base-400 mt-4 text-sm">
                            {profile.location && <span className="flex items-center"><MapPin size={14} className="mr-2" /> {profile.location}</span>}
                            {profile.company && <span className="flex items-center"><Building size={14} className="mr-2" /> {profile.company}</span>}
                            {profile.blog && <a href={profile.blog.startsWith('http') ? profile.blog : `//${profile.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline text-primary dark:text-primary-light"><LinkIcon size={14} className="mr-2" /> {profile.blog}</a>}
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Repositories ({formatNumber(profile.public_repos)})</h3>
                {loadingRepos ? (
                    <RepoListSkeleton />
                ) : repos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">This user has no public repositories.</div>
                )}
                
                {!loadingRepos && repos.length > 0 && (
                    <div className="flex justify-center mt-12">
                        {renderPagination()}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}