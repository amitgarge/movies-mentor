# movie-mentor
Movie Mentor Design using Tailwind and using Firebase integrating GPT for Searching purpose.

- Create React App
- Configured Tailwind CSS
- Header
- Routing of App
- Login Form
- Sign Up Form
- Form Validation
- useRef Hook
- Firebase Setup
- Deploying our app to production
- Sign Up User Account
- Implement Sign In User API
- Created Redux Store with userSlice
- Implemented Sign Out
- Update User Profile
- Bug Fix: Sign up user display name and profile picture update
- Bug Fix: If the user is not logged in Redirect/Browse to login page and vice versa.
- Unsubscribed to OnAuthStateChanged callback
- Add hardcoded values to the constants.js file
- Fetch Movies from TMDB
  - Register TMDB API and create an app & get Access token
  - Get Data from TMDB 'Now Playing' movies list API
- Use custome hook for 'Now Playing' movies
- Create Movie Slice 
- Update store with movies data
- Planning for main container and secondary container
- Fetch data for trailer video
- Update store with trailer video data
- embedded the YouTube Video and make it autoplay and mute
- Build Secondary Component
- Build Movie List
- Build Movie Card
- TMDB Image CDN URL
- usePopularMovies custom hooks
- adding .env file
- Responsive UI changes

# Search Feature
- Search Page
  - Search Bar
    - Multi-Lingual Feature
  - Movie Suggestions Page
    - Open AI APIs and Keys
    - Memoization
    - Fetched Movies Suggestions from Tmdb
    - resused movieList Component to make movie suggestions conatainer

# Features

-Login/Signup - Sign In/ Sign Up form - Redirect to Browse Page

- Browse(After Auth)
  - Header
  - Main Movie
    - Trailer in background
    - Title and description
    - Moview Suggestions
      - MovieLists \*n
- Movie Mentor
  - Search Bar
  - Movie Suggestions
