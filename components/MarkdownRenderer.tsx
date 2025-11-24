
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface MarkdownRendererProps {
  content: string;
  owner?: string;
  repoName?: string;
  branch?: string;
  filePath?: string;
}

const CodeBlock: React.FC<{ className?: string, children: React.ReactNode[] | React.ReactNode }> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const { activeSyntaxTheme } = useSettings();

  const lang = /language-(\w+)/.exec(className || '')?.[1] || 'text';
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden bg-base-100 dark:bg-base-900 border border-base-200 dark:border-base-800">
      <div className="flex justify-between items-center px-4 py-2 bg-base-100 dark:bg-base-800/50 border-b border-base-200 dark:border-base-800">
        <span className="text-xs font-sans text-gray-500 dark:text-base-400">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center text-xs text-gray-500 dark:text-base-400 hover:text-gray-800 dark:hover:text-white transition"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="mr-1 text-green-500" /> : <Copy size={14} className="mr-1" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        style={activeSyntaxTheme}
        language={lang}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
        codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace', fontSize: '14px' } }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, owner, repoName, branch, filePath }) => {

  const resolveUrl = (uri: string, type: 'image' | 'link') => {
    if (!uri) return '';
    
    // 1. Handle Absolute URLs
    if (uri.startsWith('http://') || uri.startsWith('https://')) {
        if (type === 'image') {
             // Fix GitHub Blob URLs -> Raw to ensure images render
             // Pattern: https://github.com/user/repo/blob/branch/path/to/image.png
             // Target: https://raw.githubusercontent.com/user/repo/branch/path/to/image.png
             const githubBlobPattern = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/;
             const match = uri.match(githubBlobPattern);
             if (match) {
                 const [_, uOwner, uRepo, uBranch, uPath] = match;
                 return `https://raw.githubusercontent.com/${uOwner}/${uRepo}/${uBranch}/${uPath}`;
             }
        }
        return uri;
    }
    
    if (uri.startsWith('data:') || uri.startsWith('mailto:') || uri.startsWith('tel:')) return uri;
    if (uri.startsWith('#')) return uri;

    // 2. Handle Protocol Relative
    if (uri.startsWith('//')) {
      return `https:${uri}`;
    }

    // 3. Handle Relative Paths
    // If we don't have enough context, return original to attempt best-effort
    if (!owner || !repoName || !branch) return uri;

    const currentPath = filePath || '';
    // Determine the "directory" of the current file.
    // If filePath is "src/utils.ts", dir is "src/".
    // If filePath is "README.md", dir is "".
    const pathDir = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/') + 1) : '';

    try {
        // Use URL constructor for robust relative path resolution
        const dummyOrigin = 'https://dummy.base';
        const dummyBase = `${dummyOrigin}/${pathDir}`;
        const resolvedUrl = new URL(uri, dummyBase);
        const resolvedPath = resolvedUrl.pathname.substring(1); // remove leading slash

        if (type === 'image') {
             return `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${resolvedPath}`;
        } else {
             // For links, redirect to our app's blob viewer so users stay in the SPA
             return `#/repo/${owner}/${repoName}/blob/${branch}/${resolvedPath}`;
        }
    } catch (e) {
        console.error(`Could not resolve URI: ${uri}`, e);
        return uri;
    }
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return <code className={className} {...props}>{children}</code>;
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },
          img: ({node, src, ...props}) => (
            <img 
                className="max-w-full" 
                src={resolveUrl(src || '', 'image')} 
                {...props} 
            />
          ),
          a: ({node, href, ...props}) => (
            <a 
                href={resolveUrl(href || '', 'link')}
                rel={!href?.startsWith('#') ? "noopener noreferrer" : undefined}
                target={!href?.startsWith('#') ? "_blank" : "_self"}
                {...props} 
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
