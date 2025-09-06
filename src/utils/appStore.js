import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import searchReducer from "./searchSlice";
import configureReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    search: searchReducer,
    config: configureReducer,
  },
});

export default appStore;
