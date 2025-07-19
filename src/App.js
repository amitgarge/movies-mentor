import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import TmdbCredits from "./components/TmdbCredits";

function App() {
  return (
    <Provider store={appStore}>
      <Body />
      <TmdbCredits />
    </Provider>
  );
}

export default App;
