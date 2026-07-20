import React from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/errorBoundary";
import { EnrollModalProvider } from "../../context/EnrollModalContext";
import { AnimatePresence, motion } from "framer-motion";

const MotionDiv = motion.div;

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <EnrollModalProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--surface-base)" }}
      >
        <Header />
        {/* Padding must track the header's own responsive height (h-14 xs:h-16 md:h-20) */}
        <div className="flex flex-1 pt-14 xs:pt-16 md:pt-20">
          <Sidebar />
          <main className="flex-1 min-w-0 md:ml-72 p-4 md:p-6 lg:p-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
              <ErrorBoundary>
                <AnimatePresence mode="wait">
                  <MotionDiv
                    key={location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <Outlet />
                  </MotionDiv>
                </AnimatePresence>
              </ErrorBoundary>
            </div>
          </main>
        </div>
      </div>
    </EnrollModalProvider>
  );
};

export default DashboardLayout;
