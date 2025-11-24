
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { ShieldCheck } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-50 dark:bg-base-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white dark:bg-base-900 p-8 md:p-12 rounded-2xl shadow-sm border border-base-200 dark:border-base-800">
            <div className="flex items-center mb-8">
                <ShieldCheck size={40} className="text-primary mr-4" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-base-300">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h3>1. Acceptance of Terms</h3>
                <p>
                    By accessing and using GitStuf, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h3>2. API Usage</h3>
                <p>
                    GitStuf utilizes the GitHub API and Google Gemini API. By using our service, you agree to comply with their respective Terms of Service. 
                    We are not affiliated with GitHub or Google.
                </p>

                <h3>3. User Data & Privacy</h3>
                <p>
                    We do not store your personal data on our servers. Your GitHub Personal Access Token is stored locally on your device 
                    using <code>localStorage</code> and is sent directly to GitHub's API. It is never transmitted to any third-party server controlled by GitStuf.
                </p>

                <h3>4. AI Features</h3>
                <p>
                    The AI features (Summary, Code Explanation, Health Check) are provided "as is". AI models can make mistakes. 
                    GitStuf is not responsible for any inaccuracies in the AI-generated content.
                </p>

                <h3>5. Disclaimer</h3>
                <p>
                    The materials on GitStuf's website are provided on an 'as is' basis. GitStuf makes no warranties, expressed or implied, 
                    and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
                    fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                
                <div className="mt-12 pt-8 border-t border-base-200 dark:border-base-800 text-sm text-center">
                    <p>Questions? Contact us at <a href="mailto:support@riodev.com" className="text-primary hover:underline">support@riodev.com</a></p>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
