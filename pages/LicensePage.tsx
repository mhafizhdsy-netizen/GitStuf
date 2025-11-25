import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Scale, Loader2, AlertTriangle } from 'lucide-react';

interface PackageJson {
  name: string;
  version: string;
  license: string;
  author?: string | { name: string; email?: string; url?: string };
}

const LicensePage: React.FC = () => {
  const [licenseContent, setLicenseContent] = useState<string | null>(null);
  const [licenseName, setLicenseName] = useState<string>('License');
  const [copyrightOwner, setCopyrightOwner] = useState<string>('The Authors');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLicenseData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch package.json for license name and author
        const packageJsonRes = await fetch('/package.json');
        if (!packageJsonRes.ok) {
          throw new Error(`Failed to fetch package.json: ${packageJsonRes.statusText}`);
        }
        const packageJson: PackageJson = await packageJsonRes.json();
        setLicenseName(packageJson.license || 'Unknown License');
        
        if (typeof packageJson.author === 'string') {
          setCopyrightOwner(packageJson.author.split('<')[0].trim());
        } else if (packageJson.author && typeof packageJson.author === 'object') {
          setCopyrightOwner(packageJson.author.name || 'The Authors');
        } else {
            // Default to 'RioDev' as seen in the footer
            setCopyrightOwner('RioDev');
        }

        // Fetch LICENSE file content
        const licenseRes = await fetch('/LICENSE');
        if (!licenseRes.ok) {
          throw new Error(`Failed to fetch LICENSE: ${licenseRes.statusText}`);
        }
        const content = await licenseRes.text();
        setLicenseContent(content);

      } catch (err: any) {
        console.error("Error fetching license data:", err);
        setError(err.message || "Failed to load license information.");
      } finally {
        setLoading(false);
      }
    };

    fetchLicenseData();
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-base-50 dark:bg-base-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white dark:bg-base-900 rounded-2xl border border-base-200 dark:border-base-800 shadow-sm">
                  <Scale size={40} className="text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                {licenseName}
              </h1>
              <p className="text-lg text-gray-600 dark:text-base-300">
                  {copyrightOwner} &copy; {year}
              </p>
          </div>
          
          {/* License Content */}
          <div className="bg-white dark:bg-base-900 p-8 rounded-lg border border-base-200 dark:border-base-800">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 size={32} className="animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="flex flex-col items-center text-red-500 text-center">
                    <AlertTriangle size={32} className="mb-3" />
                    <p>{error}</p>
                </div>
            ) : (
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 dark:text-base-300 leading-relaxed">
                    {licenseContent}
                </pre>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LicensePage;