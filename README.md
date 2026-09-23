# ✈️ Travel Planner — Frontend

React + Tailwind CSS client for the Travel Planner app — group trip planning, real-time notifications, budgeting and day-by-day scheduling.

![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![STOMP](https://img.shields.io/badge/WebSocket-STOMP-red)

## 📋 Table of contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Local setup](#-local-setup)
- [Environment variables](#-environment-variables)
- [Project structure](#-project-structure)

## 🧭 About

Travel Planner Frontend is the client for a group travel planning application. Users create trips, invite friends to groups, build day-by-day schedules, track budgets, check the weather for their destination, and receive real-time notifications pushed from the backend over WebSockets.

Built as a portfolio project while learning frontend development — React fundamentals, third-party library integration (calendars, maps, real-time data), and coordinating with a separate backend team over a REST/WebSocket contract.

## 🛠 Tech stack

| Layer | Technology | Why |
|---|---|---|
| Framework | React (Vite) | Fast dev server, modern tooling |
| Styling | Tailwind CSS | Utility-first, fast iteration, dark mode via CSS variables |
| Calendar | SVAR React Calendar (Willow / WillowDark themes) | Drag & drop scheduling, day/week/month views |
| Date picking | MUI X Date Pickers | Range selection, localization (dayjs, pl locale) |
| Real-time | `@stomp/stompjs` + `sockjs-client` | STOMP over WebSocket, subscribes to a per-user notification queue |
| Weather | OpenWeather (Geocoding + Forecast API) | City → coordinates → current + 5-day/3-hour forecast |
| HTTP client | Axios | REST calls to the Java backend |

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Frontend                           │
│                                                                   │
│  ┌───────────┐  ┌───────────┐  ┌────────────┐  ┌────────────┐   │
│  │ Dashboard │  │DaySchedule│  │  Weather   │  │Notifications│  │
│  └───────────┘  └───────────┘  └────────────┘  └────────────┘   │
│  ┌───────────┐  ┌───────────┐  ┌────────────┐  ┌────────────┐   │
│  │  Funds    │  │  Guide    │  │  Notes     │  │UserSettings│   │
│  └───────────┘  └───────────┘  └────────────┘  └────────────┘   │
└──────────────────────┬───────────────────────┬──────────────────┘
                        │ REST (Axios)          │ WebSocket (STOMP)
┌──────────────────────▼───────────────────────▼──────────────────┐
│                     Spring Boot API (separate repo)              │
└───────────────────────────────────────────────────────────────────┘
```

## ✨ Features

**Trips & Dashboard**
- List trips, select an active trip (persisted in `localStorage`)
- Create new trips with date range picking

**Day Schedule**
- Full CRUD calendar (SVAR): create, edit, delete, drag & drop with auto-save
- All-day event support with day-boundary handling
- Dark mode fully wired into the calendar theme

**Weather**
- City search + date range, geocoded via OpenWeather
- Current conditions card + 5-day forecast
- Click a forecast day to see that day's hourly breakdown

**Notifications**
- Real-time delivery via STOMP over WebSocket (`/user/queue/notifications`)
- Unread notifications fetched on load (`/api/notifications/unread`)
- Mark single / mark all as read
- Polish translations for backend-generated notification titles (static dictionary + pattern matching for dynamic titles)
- Combined view with pending friend requests (accept/reject/block) in one dropdown

**Friendships**
- Send/accept/reject/block friend requests

**Funds / Budget**
- Track and update item costs per trip

**Guide (Przewodnik)**
- Browse and add attractions/items to a trip's itinerary

**User Settings**
- Per-user preferences, dark mode toggle

## 🚀 Local setup

**Requirements**
- Node.js 18+
- A running instance of the backend (or access to a shared dev/VPS instance)

**Quick start**
```bash
# 1. Clone repository
git clone <frontend-repo-url>
cd planner-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables (see below)
cp .env.example .env

# 4. Run the dev server
npm run dev
```

The app runs at `http://localhost:5173` (default Vite port).

## 🔑 Environment variables

| Variable | Description | Example |
|---|---|---|
| `VITE_OPENWEATHER_KEY` | OpenWeather API key (Geocoding + Forecast) | `your-openweather-key` |

Backend base URL and WebSocket endpoint are currently configured directly in the API client / notification setup rather than via env vars.

## 📁 Project structure

```
src/
├── api/                    # Axios instance, base API config
├── components/             # Shared/reusable UI components (FormInput, etc.)
├── pages/                 
├── App.jsx
├── main.jsx
└── index.css                # Tailwind + CSS variables (light/dark theme)
```

## 📄 License

Part of a portfolio project. Pairs with the Travel Planner backend (Spring Boot).