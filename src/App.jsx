import React, { useEffect } from "react";

import RoutesComponent from "./utils/routes";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/UI/GlobalLoader";
import { initializeTheme } from "./utils/themeEngine";
import { applyLanguage } from "./utils/linguaEngine";

function App() {
  useEffect(() => {
    initializeTheme();
    const savedLang = localStorage.getItem("portal-lang") || "en";
    applyLanguage(savedLang);
  }, []);

  return (
    <LoadingProvider>
      <RoutesComponent />
      <GlobalLoader />
    </LoadingProvider>
  );
}

export default App;
