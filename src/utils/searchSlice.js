import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleSearchView: (state) => {
      state.showSearch = !state.showSearch;
    },
    addMovieSearchResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleSearchView, addMovieSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
