import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import userReducer from "../utils/userSlice";
import searchReducer from "../utils/searchSlice";
import configReducer from "../utils/configSlice";

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      user: userReducer,
      search: searchReducer,
      config: configReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
}

describe("Login Component", () => {
  describe("Sign In flow", () => {
    test("renders email and password fields", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Sign In/i })
      ).toBeInTheDocument();
    });

    test("shows error message for invalid email", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: "invalidEmail" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });

    test("shows error message for short password", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "12" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      expect(
        screen.getByText(/password must be at least 6 characters/i)
      ).toBeInTheDocument();
    });

    test("does not show error for valid credentials", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

      expect(
        screen.queryByText(/invalid email address/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/password must be at least 6 characters/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Sign Up flow", () => {
    test("toggles to Sign Up mode and shows Full Name field", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      fireEvent.click(screen.getByText(/Sign up/i));

      expect(
        screen.getByRole("button", { name: /Sign Up/i })
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    });

    test("toggles back to Sign In mode and hides Full Name field", () => {
      renderWithStore({
        search: { showSearch: false },
        config: { lang: "en" },
      });

      // Switch to Sign Up first
      fireEvent.click(screen.getByText(/Sign up/i));
      expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();

      // Then back to Sign In
      fireEvent.click(screen.getByText(/Sign in/i));
      expect(
        screen.getByRole("button", { name: /Sign In/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText(/Full Name/i)
      ).not.toBeInTheDocument();
    });
  });
});
