/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const showLoader = useCallback(() => setIsGlobalLoading(true), []);
  const hideLoader = useCallback(() => setIsGlobalLoading(false), []);

  const withLoader = useCallback(async (task) => {
    showLoader();
    try {
      return await task();
    } finally {
      hideLoader();
    }
  }, [hideLoader, showLoader]);

  const value = useMemo(
    () => ({ isGlobalLoading, showLoader, hideLoader, withLoader }),
    [hideLoader, isGlobalLoading, showLoader, withLoader],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }
  return ctx;
};
