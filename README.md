
# GitStuf 🚀

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38b2ac?logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google-gemini&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</div>

<br />

<div align="center">
  <strong>Explore Code. Understand Faster.</strong><br />
  A modern, minimalist, and AI-powered GitHub repository explorer.
</div>

<br />

## 🌟 Overview

**GitStuf** is a next-generation web application designed to make browsing GitHub repositories a seamless and intelligent experience. Unlike the standard GitHub interface, GitStuf focuses on readability, speed, and AI-driven insights. 

With integrated **Google Gemini AI**, you can summarize entire repositories, analyze project health, and get instant explanations for complex code snippets just by selecting them.

---

## ✨ Key Features

### 🤖 AI-Powered Intelligence
*   **Repository Summarizer**: Get a concise, one-paragraph summary of any project, generated from its README and metadata.
*   **Repo Health Check**: AI analyzes the project's documentation to identify red flags, maintenance status, and clarity.
*   **Smart Code Explanation**: Select *any* line of code in the file viewer and ask the AI to explain it in plain English.

### ⚡ Modern Browsing Experience
*   **Blazing Fast File Explorer**: Navigate file trees instantly without page reloads.
*   **Rich Content Viewer**: 
    *   Syntax highlighting for 40+ languages.
    *   Markdown rendering with support for HTML and GitHub-flavored tables.
    *   Image preview support (SVG, PNG, JPG).
*   **Deep Search**: Advanced search capabilities with pagination support up to 1000 results.

### 🎨 Customizable UI
*   **Dark & Light Mode**: Seamlessly switch themes based on your preference or system settings.
*   **Syntax Highlighting Themes**: Choose from popular themes like **Dracula**, **GitHub Light**, **Monokai**, **Nord**, and more.
*   **Responsive Design**: A mobile-first approach ensures you can read code comfortably on any device.

### 📊 Comprehensive Data
*   **Repo Details**: View commits, issues, pull requests, and license info in dedicated tabs.
*   **Visual Stats**: Beautiful language breakdown bars and contributor lists.
*   **User Profiles**: Explore developer profiles, bio, social links, and their repositories.

### 🔒 Privacy First
*   **Client-Side Only**: We do not have a backend database.
*   **Local Storage**: Your GitHub Personal Access Token (PAT) and settings are stored securely in your browser's LocalStorage.
*   **Direct API Calls**: The app communicates directly with GitHub and Google APIs.

---

## 🛠️ Tech Stack

*   **Framework**: React 19 (via Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM v6+
*   **State Management**: React Context API
*   **Icons**: Lucide React
*   **AI**: Google Generative AI SDK (`@google/genai`)
*   **Markdown**: React Markdown, Rehype Raw, Remark GFM
*   **Data Fetching**: Axios

---

## 🚀 Deployment

You can deploy your own instance of GitStuf easily using the buttons below.

### Prerequisites for Deployment
To enable AI features, you need a **Google Gemini API Key**.
1.  Get a key from [Google AI Studio](https://aistudiocdn.com/google-ai-studio).
2.  Set the Environment Variable `API_KEY` in your deployment platform.

| Platform | Deploy Link |
| :--- | :--- |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fgitstuf&env=API_KEY) |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/your-username/gitstuf) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/gitstuf) |

---

## 💻 Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/gitstuf.git
    cd gitstuf
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    # Required for AI Features
    API_KEY=your_google_gemini_api_key
    ```
    *Note: In the provided codebase, `process.env.API_KEY` is polyfilled or replaced by the bundler.*

4.  **Start the development server**
    ```bash
    npm run dev
    ```

---

## ⚙️ Configuration

### GitHub Rate Limits
Without a token, GitHub limits you to **60 requests/hour**. To increase this to **5,000 requests/hour**:
1.  Click the **Settings** (Gear icon) in the header.
2.  Enter a [GitHub Personal Access Token](https://github.com/settings/tokens/new?scopes=public_repo).
3.  Click Save.

### Syntax Themes
1.  Open **Settings**.
2.  Select your preferred **Syntax Highlighting Theme** from the dropdown.

---

## 🔮 Roadmap

- [ ] **Chat with Repo**: RAG-based chat interface to ask questions about the entire codebase.
- [ ] **Visual Dependency Graph**: Interactive node graph for file dependencies.
- [ ] **AI PR Reviewer**: Automatic summarization and impact analysis of Pull Requests.
- [ ] **Local Bookmarks**: Save repositories to custom lists in your browser.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Made with ❤️ by <strong>RioDev</strong>
</div>
