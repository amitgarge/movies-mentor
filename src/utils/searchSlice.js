import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
    movieNames: null,
    movieResults: null,
    loading: false,
  },
  reducers: {
    toggleSearchView: (state) => {
      state.showSearch = !state.showSearch;
    },
    addMovieSearchResults: (state, action) => {
      if (action.payload === null) {
        state.movieNames = null;
        state.movieResults = null;
      } else {
        state.movieNames = action.payload.movieNames;
        state.movieResults = action.payload.movieResults;
      }
    },
    setSearchLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleSearchView, addMovieSearchResults, setSearchLoading } =
  searchSlice.actions;

export default searchSlice.reducer;
