import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Scale } from 'lucide-react';

const LicensePage: React.FC = () => {
  const year = new Date().getFullYear();
  const owner = "RioDev"; // Sesuai dengan footer

  const licenseText = `MIT License

Copyright (c) ${year} ${owner}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
  `.trim();

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
                MIT License
              </h1>
              <p className="text-lg text-gray-600 dark:text-base-300">
                  GitStuf is an open source project licensed under the MIT License.
              </p>
          </div>
          
          {/* License Content */}
          <div className="bg-white dark:bg-base-900 p-8 rounded-lg border border-base-200 dark:border-base-800">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 dark:text-base-300 leading-relaxed">
              {licenseText}
            </pre>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LicensePage;
