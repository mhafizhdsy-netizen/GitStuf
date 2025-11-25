# GitStuf 🚀

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38b2ac?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google-gemini&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</div>

<br />

<div align="center">
  <strong>Explore Code. Understand Faster.</strong>
  <p>A modern, minimalist, and AI-powered GitHub repository explorer.</p>
</div>

<div align="center">
  <a href="https://your-live-demo-url.com" target="_blank"><strong>View Live Demo »</strong></a>
</div>

<br />

<!-- Placeholder for a high-quality screenshot or GIF of the application in action -->
<!-- <p align="center">
  <img src="link_to_your_screenshot.png" alt="GitStuf Application Screenshot" width="800"/>
</p> -->


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
*   **Blazing Fast File Explorer**: Navigate file trees instantly without page reloads. Supports intelligent code folding for all languages (`{}`, `[]`, `()`, and HTML tags).
*   **Rich Content Viewer**: 
    *   Syntax highlighting for 40+ languages with customizable themes.
    *   Flawless Markdown rendering with relative image and link resolution.
    *   Image preview support (SVG, PNG, JPG).
*   **Deep Search & Pagination**: Advanced search with robust sorting and pagination support up to 1000 results.

### 🎨 Customizable & Elegant UI
*   **Dark & Light Mode**: Seamlessly switch themes based on your preference or system settings.
*   **Multiple Color Themes**: Choose from a variety of color palettes like Dracula, Solarized, Nord, and more to personalize your experience.
*   **Responsive Design**: A mobile-first approach ensures you can read code comfortably on any device.

### 🔒 Privacy First
*   **Client-Side Only**: We do not have a backend database. Your data stays with you.
*   **Local Storage**: Your GitHub Personal Access Token (PAT) and settings are stored securely in your browser's LocalStorage.
*   **Direct API Calls**: The app communicates directly and securely with the GitHub and Google APIs.

---

## 🛠️ Tech Stack

*   **Framework**: React 19 (bootstrapped with Vite)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Routing**: React Router DOM v6+
*   **State Management**: React Context API
*   **Icons**: Lucide React
*   **AI**: Google Generative AI SDK (`@google/genai`)
*   **Markdown**: React Markdown, Rehype Raw, Remark GFM
*   **Syntax Highlighting**: `react-syntax-highlighter`
*   **Data Fetching**: Axios

---

## 🚀 Getting Started (Local Development)

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation
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
    Create a `.env` file in the root directory and add your Google Gemini API Key.
    ```env
    # Required for all AI Features
    API_KEY=your_google_gemini_api_key
    ```
    You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## ⚙️ Configuration

### GitHub Rate Limits
Without a token, GitHub limits you to **60 requests/hour**. To increase this to **5,000 requests/hour**:
1.  Click the **Settings** (Gear icon) in the header.
2.  Generate a [GitHub Personal Access Token](https://github.com/settings/tokens/new?scopes=public_repo) with `public_repo` scope.
3.  Paste the token into the input field and click Save.

### Themes
1.  Open **Settings**.
2.  Select your preferred **Color Theme** and **Syntax Highlighting Theme** from the dropdowns.

---

## 🤝 Contributing

Contributions are welcome! If you have a feature request, bug report, or want to contribute code, please follow these steps:

1.  **Fork the repository.**
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some amazing feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a **Pull Request**.

Please ensure your code follows the existing style and that you test your changes thoroughly.

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