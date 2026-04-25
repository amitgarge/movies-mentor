import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import TmdbCredits from "./components/TmdbCredits";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback"; // ✅ new component for error UI

function App() {
  return (
    <Provider store={appStore}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()} // reload app on reset
      >
        <Body />
        <TmdbCredits />        
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
