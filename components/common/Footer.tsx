
import React from 'react';
import { Link } from 'react-router-dom';
import { GitStufIcon } from '../../assets/icon';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-base-950 border-t border-base-200 dark:border-base-800 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GitStufIcon className="w-8 h-8" />
              <span className="font-bold text-xl text-gray-800 dark:text-gray-100">GitStuf</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-base-400 leading-relaxed">
              Explore the open-source world with a modern, AI-enhanced interface. 
              Discover repositories, analyze code, and connect with developers.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-base-400">
              <li><Link to="/search" className="hover:text-primary transition-colors">Search</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About & Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-base-400">
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-base-100 dark:bg-base-900 rounded-full hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-base-400">
                <Github size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-base-100 dark:bg-base-900 rounded-full hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-base-400">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-base-200 dark:border-base-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-base-500">
          <p>&copy; {new Date().getFullYear()} GitStuf. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-500 fill-red-500" />
            <span>by <strong className="text-primary">RioDev</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
