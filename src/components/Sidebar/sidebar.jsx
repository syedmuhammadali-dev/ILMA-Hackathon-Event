import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: "Home", key: 'dashboard', path: "/", icon: "home" },
    { title: "Portal", key: 'portal', path: "/portal", icon: "th-large" },
    { title: "Profile", key: 'profile', path: "/profile", icon: "user" },
    { title: "Academic Grades", key: 'grades', path: "/grades", icon: "poll-h" },
    { title: "Class Schedule", key: 'schedule', path: "/schedule", icon: "calendar-alt" },
    { title: "Financial Ledger", key: 'financial', path: "/financial", icon: "credit-card" },
    { title: "Assignment Hub", key: 'assignments', path: "/assignments", icon: "tasks" },
    { title: "Campus Pulse", key: 'campus', path: "/campus-pulse", icon: "satellite-dish" },
    { title: "Notifications", key: 'notifications', path: "/notifications", icon: "bell" },
    { title: "Appearance Settings", key: 'appearance', path: "/appearance", icon: "paint-brush" },
  ];
  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 border-r border-[var(--border-soft)] hidden md:block z-[90] shadow-sm rounded-none">
      <div className="h-full flex flex-col px-4 py-6">

        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-2 pt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const translatedTitle = getTranslation(item.key) || item.title;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                  ? "bg-primary-theme text-white shadow-primary-theme"
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-primary-theme rounded-2xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <MotionDiv
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MDBIcon
                    fas
                    icon={item.icon}
                    className={`text-base ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}
                  />
                </MotionDiv>
                <span className={`text-sm font-bold tracking-tight ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"}`}>
                  {translatedTitle}
                </span>

                {item.title === "Notifications" && (
                  <span className="ml-auto h-5 w-5 rounded-full bg-rose-500 text-[10px] flex items-center justify-center text-white font-black border-2 border-white dark:border-slate-800">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;
