import React, { useEffect } from "react";

import RoutesComponent from "./utils/routes";
import { LoadingProvider } from "./context/LoadingContext";
import GlobalLoader from "./components/UI/GlobalLoader";
import { initializeTheme } from "./utils/themeEngine";
import { applyLanguage } from "./utils/linguaEngine";
import ErrorBoundary from "./components/ErrorBoundary/errorBoundary";

function App() {
  useEffect(() => {
    initializeTheme();
    const savedLang = localStorage.getItem("portal-lang") || "en";
    applyLanguage(savedLang);
  }, []);

  return (
    // Outer net: the per-page boundary lives inside DashboardLayout, so a throw
    // from Header or Sidebar itself had nothing to catch it.
    <ErrorBoundary>
      <LoadingProvider>
        <RoutesComponent />
        <GlobalLoader />
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;
