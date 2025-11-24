
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Code, Database, Cpu, Globe, Zap, Layout, MessageSquare, Share2, GitPullRequest, Bookmark, ArrowRight } from 'lucide-react';

const RoadmapItem: React.FC<{ icon: React.ElementType, title: string, desc: string, badge?: string }> = ({ icon: Icon, title, desc, badge }) => (
  <div className="flex flex-col h-full p-6 bg-white dark:bg-base-900 rounded-xl border border-base-200 dark:border-base-800 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        <Icon size={100} />
    </div>
    <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="p-3 bg-base-100 dark:bg-base-800 rounded-lg text-primary">
            <Icon size={24} />
        </div>
        {badge && (
            <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
                {badge}
            </span>
        )}
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{title}</h3>
    <p className="text-gray-600 dark:text-base-400 text-sm leading-relaxed relative z-10">{desc}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-50 dark:bg-base-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
              About GitStuf
            </h1>
            <p className="text-xl text-gray-600 dark:text-base-300 leading-relaxed max-w-2xl mx-auto">
              GitStuf is a modern, privacy-focused GitHub explorer built to provide a superior browsing experience for developers. 
              We combine the power of GitHub's extensive database with cutting-edge AI to help you understand code faster.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="mb-20">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center justify-center md:justify-start">
              <Database className="mr-3 text-blue-500" /> Under the Hood
            </h2>
            <div className="bg-white dark:bg-base-900 rounded-2xl border border-base-200 dark:border-base-800 p-8 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Code className="text-blue-500 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">React 19</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Code className="text-blue-400 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">TypeScript</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Layout className="text-teal-400 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">Tailwind CSS</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Globe className="text-orange-500 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">React Router</span>
                    </div>
                     <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Cpu className="text-purple-500 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">Axios</span>
                    </div>
                     <div className="flex flex-col items-center text-center p-2 hover:-translate-y-1 transition-transform duration-300">
                        <Layout className="text-gray-500 mb-3" size={32} />
                        <span className="font-semibold dark:text-white">Lucide Icons</span>
                    </div>
                </div>
            </div>
          </section>

          {/* APIs Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center justify-center md:justify-start">
              <Zap className="mr-3 text-yellow-500" /> Powered By
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-base-900 rounded-xl border border-base-200 dark:border-base-800 shadow-sm hover:border-primary/50 transition-colors group">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-black text-white rounded-lg mr-4 group-hover:scale-110 transition-transform"><Globe size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">GitHub REST API</h3>
                </div>
                <p className="text-gray-600 dark:text-base-400">
                  The backbone of GitStuf. We fetch real-time data about repositories, users, commits, and issues directly from GitHub's official API, ensuring you always see the latest changes.
                </p>
              </div>
              
              <div className="p-6 bg-white dark:bg-base-900 rounded-xl border border-base-200 dark:border-base-800 shadow-sm hover:border-primary/50 transition-colors group">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg mr-4 group-hover:scale-110 transition-transform"><Cpu size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Google Gemini AI</h3>
                </div>
                <p className="text-gray-600 dark:text-base-400">
                  Integrated into our core, Gemini AI powers our intelligent features: code explanation, repository summarization, and health checks. It turns raw code into human-readable insights.
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap Section - New Feature */}
          <section className="mb-20 relative">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl -z-10"></div>
             <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Future Roadmap
                </h2>
                <p className="text-center text-gray-600 dark:text-base-400 mb-10 max-w-xl mx-auto">
                    We are just getting started. Here is what we are building next to make GitStuf the ultimate developer companion.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RoadmapItem 
                        icon={MessageSquare}
                        title="Chat with Repo"
                        badge="In Progress"
                        desc="Ask questions like 'Where is the auth logic?' and get answers based on the entire codebase context using RAG (Retrieval-Augmented Generation)."
                    />
                    <RoadmapItem 
                        icon={Share2}
                        title="Visual Dependency Graph"
                        desc="Interactive 2D/3D node graphs to visualize file dependencies and project architecture at a glance."
                    />
                     <RoadmapItem 
                        icon={GitPullRequest}
                        title="AI PR Reviewer"
                        desc="Get instant AI summaries of Open Pull Requests to understand the impact of changes before you review the code."
                    />
                     <RoadmapItem 
                        icon={Bookmark}
                        title="Local Collections"
                        desc="Create custom lists and bookmarks for repositories locally in your browser, without needing a GitHub account."
                    />
                </div>
             </div>
          </section>

          <section className="text-center pt-8 border-t border-base-200 dark:border-base-800">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Developed by RioDev
            </h2>
            <p className="text-gray-600 dark:text-base-400 mb-6">
                A passionate developer dedicated to building beautiful, functional, and performant web applications.
            </p>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg">
                View on GitHub <ArrowRight size={18} className="ml-2" />
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
