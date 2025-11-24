
import React, { useState, useEffect } from 'react';
import { githubApi } from '../services/githubApi';
import { Loader2, Scale, AlertTriangle } from 'lucide-react';

interface LicenseViewerProps {
  owner: string;
  repo: string;
}

const LicenseViewer: React.FC<LicenseViewerProps> = ({ owner, repo }) => {
  const [license, setLicense] = useState<{name: string; content: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    githubApi.getLicense(owner, repo)
      .then(response => {
        if (response.data && response.data.content) {
          setLicense({
            name: response.data.license.name,
            content: atob(response.data.content)
          });
        } else {
          setError('No license file found in this repository.');
        }
      })
      .catch(() => {
        setError('No license file found in this repository.');
      })
      .finally(() => setLoading(false));
  }, [owner, repo]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin" size={32} /></div>;
  }

  if (error || !license) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400 flex flex-col items-center">
        <AlertTriangle size={32} className="mb-4 text-yellow-500" />
        {error || 'Could not load license.'}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
        <h3 className="font-semibold flex items-center"><Scale size={16} className="mr-2" /> {license.name}</h3>
      </div>
      <pre className="p-4 text-sm whitespace-pre-wrap font-mono bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 overflow-x-auto">
        {license.content}
      </pre>
    </div>
  );
};

export default LicenseViewer;
