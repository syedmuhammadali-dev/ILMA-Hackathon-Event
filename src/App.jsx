import React from "react";

import RoutesComponent from "./utils/routes";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/UI/GlobalLoader";

function App() {
  return (
    <LoadingProvider>
      <RoutesComponent />
      <GlobalLoader />
    </LoadingProvider>
  );
}

export default App;
