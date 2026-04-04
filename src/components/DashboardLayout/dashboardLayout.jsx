import React from "react";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/errorBoundary";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--surface-base)" }}>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-72 p-4 md:p-6 lg:p-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto page-shell">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
