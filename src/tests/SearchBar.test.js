import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBar from "../components/SearchBar";
import configReducer from "../utils/configSlice";
import searchReducer from "../utils/searchSlice";

// Helper to render SearchBar with a test store
function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      config: configReducer,
      search: searchReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
}

test("renders search input and button", () => {
  renderWithStore({
    config: { lang: "en" },
    search: { loading: false },
  });

  // input exists
  expect(
    screen.getByPlaceholderText(/What would you like to watch today/i)
  ).toBeInTheDocument();

  // button exists
  expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
});

test("disables button and shows spinner when loading", () => {
  renderWithStore({
    config: { lang: "en" },
    search: { loading: true },
  });

  const button = screen.getByRole("button");
  expect(button).toBeDisabled();

  // the spinner is inside button → role="status" is a good accessibility label
  const spinner = screen.getByRole("status", { hidden: true });
  expect(spinner).toBeInTheDocument();
});
