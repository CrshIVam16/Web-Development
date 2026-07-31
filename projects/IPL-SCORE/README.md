# 🏏IPL-SCORE

A React + Vite application that displays IPL 2026 match details and points table information in a clean dashboard layout.

## Features

- Match list grouped by date
- Match status and score summary for completed games
- Points table with team standings, points, NRR, and recent form
- Navigation between Matches, Table, and Match Detail pages
- Static IPL data included in the app for quick local preview

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- ESLint
- Flaticon icons

## Project Structure

- `index.html` - application entry HTML
- `package.json` - dependencies and scripts
- `vite.config.js` - Vite configuration
- `src/main.jsx` - React app bootstrap
- `src/App.jsx` - route definitions
- `src/components/Home.jsx` - match listing page
- `src/components/PointsTable.jsx` - points table view
- `src/components/MatchDetail.jsx` - match detail page
- `src/components/Navbar.jsx` - navigation layout

## Setup

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. **Demonstration via static data :** [Live-link](https://cr-ipl-scores.netlify.app/)

## Notes

- The app currently uses static data defined inside component files rather than fetching from a live API. 
- I have just used API and copied the response to use it statically due to API limit boundation, you can just add you own API of **crizbuzz from Rapid API.**
- `Home.jsx` contains hardcoded IPL match details for the 2026 season.
- `PointsTable.jsx` contains fixed standings and recent match information.

## Recommended Improvements

- Add API integration to fetch live IPL match and points data
- Convert hardcoded data to JSON or a shared data module
- Improve mobile responsiveness and UI styling
- Add search/filter support for matches and teams

