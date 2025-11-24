
import React from 'react';
import { Link } from 'react-router-dom';
import { Repo } from '../types';
import { Star, GitFork, Scale } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <Link to={`/repo/${repo.full_name}`} className="block group h-full">
      <div className="bg-white dark:bg-base-900 rounded-2xl p-5 shadow-sm border border-base-200 dark:border-base-800 h-full flex flex-col transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-primary/30 dark:group-hover:border-primary/30 group-hover:shadow-primary/5">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-primary transition-colors">
            {repo.full_name}
          </h3>
          <p className="text-gray-600 dark:text-base-300 text-sm mt-2 h-10 overflow-hidden line-clamp-2">
            {repo.description}
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-700 dark:text-base-300">
            <div className="flex items-center space-x-5">
                <span className="flex items-center" title="Stars">
                  <Star size={16} className="mr-1.5 text-yellow-500 group-hover:fill-yellow-500 transition-colors" />
                  {formatNumber(repo.stargazers_count)}
                </span>
                <span className="flex items-center" title="Forks">
                  <GitFork size={16} className="mr-1.5 text-gray-500 dark:text-base-400" />
                  {formatNumber(repo.forks_count)}
                </span>
            </div>
             {repo.language && (
                <span className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-base-100 dark:bg-base-800 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <span className="h-2 w-2 rounded-full bg-primary mr-1.5"></span>
                  {repo.language}
                </span>
             )}
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;