/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";

const EnrollModalContext = createContext(null);

export const EnrollModalProvider = ({ children }) => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);

  const value = useMemo(
    () => ({
      isEnrollOpen,
      openEnrollModal: () => setIsEnrollOpen(true),
      closeEnrollModal: () => setIsEnrollOpen(false),
      toggleEnrollModal: () => setIsEnrollOpen((prev) => !prev),
    }),
    [isEnrollOpen],
  );

  return (
    <EnrollModalContext.Provider value={value}>
      {children}
    </EnrollModalContext.Provider>
  );
};

export const useEnrollModal = () => {
  const ctx = useContext(EnrollModalContext);
  if (!ctx) {
    throw new Error("useEnrollModal must be used within EnrollModalProvider");
  }
  return ctx;
};
