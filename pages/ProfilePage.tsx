
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { githubApi } from '../services/githubApi';
import { UserProfile, Repo } from '../types';
import { Loader2, ServerCrash, Users, MapPin, Link as LinkIcon, Building } from 'lucide-react';
import Header from '../components/common/Header';
import RepoCard from '../components/RepoCard';
import { formatNumber } from '../utils/formatters';
import { useSettings } from '../contexts/SettingsContext';

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


export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { openSettingsModal } = useSettings();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingRepos, setLoadingRepos] = useState(false);

    const fetchProfileData = useCallback(async () => {
        if (!username) return;
        setLoading(true);
        setError(null);
        setPage(1);
        setRepos([]);
        setHasMore(true);
        try {
            const profileRes = await githubApi.getUserProfile(username);
            setProfile(profileRes.data);
            
            const reposRes = await githubApi.getUserRepos(username, 1);
            setRepos(reposRes.data);
            if(reposRes.data.length < 12) {
                setHasMore(false);
            }

        } catch (err: any) {
            if (err.response && err.response.status === 403) {
              setError('API rate limit exceeded. Your token might be invalid or missing necessary scopes.');
              openSettingsModal();
            } else {
              setError('Failed to fetch profile data. User might not exist.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [username, openSettingsModal]);

    const loadMoreRepos = useCallback(async () => {
        if (!username || loadingRepos || !hasMore) return;
        setLoadingRepos(true);
        const nextPage = page + 1;
        try {
            const reposRes = await githubApi.getUserRepos(username, nextPage);
            setRepos(prev => [...prev, ...reposRes.data]);
            setPage(nextPage);
            if (reposRes.data.length < 12) {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Failed to fetch more repos", err);
        } finally {
            setLoadingRepos(false);
        }
    }, [username, page, loadingRepos, hasMore]);

    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    if (loading) {
        return (
            <>
                <Header />
                <ProfilePageSkeleton />
            </>
        )
    }

    if (error || !profile) {
        return (
            <>
              <Header />
              <div className="flex flex-col justify-center items-center h-screen text-center -mt-16">
                <ServerCrash size={64} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p className="text-gray-600 dark:text-base-300">{error}</p>
                <Link to="/" className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">Go back home</Link>
              </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
                </div>

                {hasMore && (
                    <div className="text-center mt-10">
                        <button onClick={loadMoreRepos} disabled={loadingRepos} className="px-6 py-2 border border-base-300 dark:border-base-700 rounded-lg hover:bg-base-100 dark:hover:bg-base-800 transition disabled:opacity-50 font-semibold">
                            {loadingRepos ? <Loader2 className="animate-spin inline-block" /> : 'Load more'}
                        </button>
                    </div>
                )}
            </main>
        </>
    );
}
