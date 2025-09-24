import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import TmdbCredits from "./components/TmdbCredits";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback"; // ✅ new component for error UI
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Provider store={appStore}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()} // reload app on reset
      >
        <Body />
        <TmdbCredits />
        {/* ✅ Toast container */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { background: "#10B981", color: "#fff" }, // green
            },
            error: {
              style: { background: "#EF4444", color: "#fff" }, // red
            },
          }}
        />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
