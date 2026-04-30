# Movie Mentor UI

Movie Mentor is a Netflix-inspired movie discovery app built with React. It supports Firebase authentication, curated TMDB movie sections, trailer playback, multilingual UI text, and AI-assisted movie recommendations through the Movie Mentor backend.

The frontend no longer calls TMDB or OpenAI directly. All movie data and recommendation requests go through the backend API so secrets stay server-side.

## Features

- Login and signup with Firebase Authentication
- Protected browse experience after authentication
- Now Playing, Popular, Top Rated, and Upcoming movie rows
- Featured movie hero with YouTube trailer background
- Movie recommendation search powered by the backend
- Query validation and adult-content blocking before requests are sent
- Redux Toolkit state management
- Multilingual search UI copy
- Responsive Tailwind CSS layout
- Unit tests for auth, validation, and search guards

## Tech Stack

- React 19
- Create React App
- Redux Toolkit and React Redux
- React Router
- Firebase Authentication
- Tailwind CSS
- React Hot Toast
- Jest and React Testing Library

## Prerequisites

- Node.js
- npm
- Running Movie Mentor backend API
- Firebase project configuration in `src/utils/firebase.js`

## Environment Variables

Create a `.env` file in the frontend project root:

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:3001
```

Do not add TMDB or OpenAI keys to the frontend. Those belong in the backend `.env`.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The app usually runs at:

```txt
http://localhost:3000
```

Make sure the backend is running at the URL configured in `REACT_APP_BACKEND_URL`.

## Available Scripts

```bash
npm start
```

Runs the app in development mode.

```bash
npm test -- --watchAll=false
```

Runs the test suite once.

```bash
npm run build
```

Creates a production build in the `build` folder.

## Backend API Usage

The UI consumes these backend endpoints:

```txt
GET  /api/movies/now-playing
GET  /api/movies/popular
GET  /api/movies/top-rated
GET  /api/movies/upcoming
GET  /api/movies/:movieId/trailer
POST /api/recommend
```

Recommendation request example:

```json
{
  "query": "latest hindi action movies"
}
```

Recommendation response shape:

```json
{
  "movieNames": ["latest hindi action movies"],
  "movieResults": [[{ "id": 1, "title": "Example Movie" }]],
  "source": "tmdb-discover"
}
```

## Project Structure

```txt
src/
  components/      Reusable UI and page components
  hooks/           Backend-backed movie data hooks
  tests/           Jest and Testing Library tests
  utils/           Redux store, slices, constants, Firebase, validation helpers
```

## Notes

- Keep `REACT_APP_BACKEND_URL` pointed at the running backend.
- Restart the React dev server after changing `.env`.
- TMDB attribution is displayed in the app because movie data is provided by TMDB through the backend.
