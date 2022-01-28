import AppState from "./context/AppState";

import AppRoot from "./AppRoot";

const App = () => {
  return (
    <AppState>
      <AppRoot />
    </AppState>
  );
};

export default App;
