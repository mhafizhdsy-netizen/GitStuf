
import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';
import Header from '../components/common/Header';

const ErrorPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
        <Frown className="w-24 h-24 text-blue-500 mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
