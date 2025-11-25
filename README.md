# Aninemax 🎬

Aninemax is a modern, mobile-first anime streaming and manga reading platform built with **Next.js 14**, **Tailwind CSS**, and **Jikan/Consumet APIs**.

## 🚀 Features

- **Massive Library**: Data sourced from MyAnimeList (via Jikan v4) and GogoAnime (via Consumet).
- **Streaming**: Custom Video Player (Plyr) with quality selection, skip intro, and autoplay.
- **Manga Reader**: High-quality reader with Long Strip and Page-by-Page modes.
- **Progress Tracking**: Local persistence for Watchlist and History using Zustand & LocalStorage.
- **Modern UI**: Glassmorphism design, dark mode default, fully responsive.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Data Fetching**: Native Fetch + SWR
- **Player**: Plyr.js

## 📦 Installation

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   # Public instance or self-hosted Consumet API URL
   NEXT_PUBLIC_CONSUMET_API=https://api.consumet.org/anime/gogoanime
   NEXT_PUBLIC_JIKAN_API=https://api.jikan.moe/v4
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## ⚠️ API Note
This project relies on the **Consumet API** for streaming links. If the public instance is rate-limited, please self-host a Consumet instance.
