import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBar from "../components/SearchBar";
import configReducer from "../utils/configSlice";
import searchReducer from "../utils/searchSlice";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Helper to render SearchBar with a test store
function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      config: configReducer,
      search: searchReducer,
    },
    preloadedState,
  });

  const view = render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

  return { store, ...view };
}

afterEach(() => {
  global.fetch?.mockClear?.();
  jest.clearAllMocks();
  jest.useRealTimers();
});

test("renders search input", () => {
  renderWithStore({
    config: { lang: "en" },
    search: { loading: false },
  });

  // input exists
  expect(
    screen.getByPlaceholderText(/What would you like to watch today/i)
  ).toBeInTheDocument();
});

test("blocks meaningless queries before calling backend", () => {
  jest.useFakeTimers();
  global.fetch = jest.fn();

  const { store } = renderWithStore({
    config: { lang: "en" },
    search: { loading: false },
  });

  fireEvent.change(
    screen.getByPlaceholderText(/What would you like to watch today/i),
    {
      target: { value: "ghgh" },
    },
  );

  act(() => {
    jest.advanceTimersByTime(700);
  });

  expect(global.fetch).not.toHaveBeenCalled();
  expect(toast.error).toHaveBeenCalledWith("Please enter a valid movie name.");
  expect(store.getState().search.movieNames).toEqual([]);
  expect(store.getState().search.movieResults).toEqual([]);
});

test("blocks adult-content queries before calling backend", () => {
  jest.useFakeTimers();
  global.fetch = jest.fn();

  const { store } = renderWithStore({
    config: { lang: "en" },
    search: { loading: false },
  });

  fireEvent.change(
    screen.getByPlaceholderText(/What would you like to watch today/i),
    {
      target: { value: "Adult Content" },
    },
  );

  act(() => {
    jest.advanceTimersByTime(700);
  });

  expect(global.fetch).not.toHaveBeenCalled();
  expect(toast.error).toHaveBeenCalledWith(
    "Adult content searches are not supported.",
  );
  expect(store.getState().search.movieNames).toEqual([]);
  expect(store.getState().search.movieResults).toEqual([]);
});
