import React, { useEffect, useRef, useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { storage } from "../../utils/storage";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { applyMode } from "../../utils/themeEngine";
import { applyLanguage, getTranslation } from "../../utils/linguaEngine";
import Logo from "../../assets/Logo.png";
import Swal from "sweetalert2";

const MotionDiv = motion.div;
const MotionButton = motion.button;

// Shared by the mobile menu and the desktop search. Note this is the header's
// own ordering/icons, which intentionally differ from the sidebar's.
const NAV_ITEMS = [
  { title: "Home", key: "dashboard", path: "/", icon: "home" },
  { title: "Portal", key: "portal", path: "/portal", icon: "th-large" },
  { title: "Profile", key: "profile", path: "/profile", icon: "user" },
  { title: "Grades", key: "grades", path: "/grades", icon: "poll-h" },
  { title: "Financial", key: "financial", path: "/financial", icon: "wallet" },
  {
    title: "Assignments",
    key: "assignments",
    path: "/assignments",
    icon: "tasks",
  },
  {
    title: "Schedule",
    key: "schedule",
    path: "/schedule",
    icon: "calendar-alt",
  },
  {
    title: "Campus Pulse",
    key: "campus",
    path: "/campus-pulse",
    icon: "heartbeat",
  },
  {
    title: "Notifications",
    key: "notifications",
    path: "/notifications",
    icon: "bell",
  },
  {
    title: "Appearance",
    key: "appearance",
    path: "/appearance",
    icon: "paint-brush",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLinguaOpen, setIsLinguaOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("portal-mode") || "dark",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const mobileMenuRef = useRef(null);
  const desktopMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const searchResults = searchQuery.trim()
    ? NAV_ITEMS.filter((item) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          (getTranslation(item.key) || "").toLowerCase().includes(q)
        );
      })
    : [];

  const goToResult = (path) => {
    setSearchQuery("");
    searchInputRef.current?.blur();
    navigate(path);
  };

  const toggleMode = () => {
    const newMode = currentMode === "dark" ? "light" : "dark";
    setCurrentMode(newMode);
    applyMode(newMode);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "End Session?",
      text: "Are you sure you want to log out of your student portal?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout Now",
      cancelButtonText: "Stay Logged In",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#94a3b8",
      background: "#ffffff",
      color: "#1e293b",
      customClass: {
        popup: "rounded-2xl border-none shadow-xl",
        title: "text-xl font-black",
        confirmButton: "rounded-xl px-6 py-3 font-bold",
        cancelButton: "rounded-xl px-6 py-3 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        storage.logout();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    // Keep the toggle icon in sync when the mode is changed elsewhere
    // (Appearance page, another tab). App.jsx does the initial apply.
    const observer = new MutationObserver(() => {
      setCurrentMode(
        document.documentElement.getAttribute("data-theme") || "dark",
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // The ⌘K / Ctrl+K hint next to the search box needs a real handler
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (event.key === "Escape") {
        setMobileOpen(false);
        setIsLinguaOpen(false);
        setSearchQuery("");
      }
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target)
      ) {
        setIsLinguaOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MDBNavbar
      expand="lg"
      fixed="top"
      className="z-[100] h-14 xs:h-16 md:h-20 glass-panel border-b premium-shadow w-full"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        maxWidth: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <MDBContainer
        fluid
        className="px-2 xs:px-3 sm:px-6 md:px-12 flex items-center justify-between gap-1 sm:gap-2"
        style={{ maxWidth: "100%" }}
      >
        <div className="flex items-center flex-1 min-w-0">
          <MotionDiv
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <MDBNavbarBrand
              href="/"
              className="m-0 p-0 flex items-center group shrink-0"
            >
              <img
                src={Logo}
                className="h-6 xs:h-7 sm:h-10 w-auto object-contain shrink-0"
                alt="University Logo"
              />

              <div className="flex flex-col ml-1 me-1 xs:me-2 sm:me-5 min-w-0">
                <span className="text-[12px] xs:text-sm sm:text-xl font-black tracking-tight leading-none text-slate-900 whitespace-nowrap">
                  <span className="hidden min-[360px]:inline">Student</span>
                  <span className="text-blue-600">Portal</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-widest font-black text-slate-400 mt-1">
                  University Admin
                </span>
              </div>
            </MDBNavbarBrand>
          </MotionDiv>

          {/* New Search Element - only shown at lg (1024px+) to avoid header crowding */}
          <div
            ref={searchRef}
            className="relative ml-4 lg:ml-8 flex-1 min-w-0 hidden lg:block"
          >
            <div className="search-container">
              <MDBIcon
                fas
                icon="search"
                className="text-slate-400 text-sm shrink-0"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    goToResult(searchResults[0].path);
                  }
                }}
                placeholder="Search pages..."
                className="bg-transparent border-none outline-none text-sm w-full flex-1 font-bold placeholder:text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
                style={{ color: "var(--text-primary)" }}
              />
              <div className="px-1.5 py-0.5 rounded-md bg-slate-200/50 text-[10px] font-bold text-slate-500 border border-slate-300/30 shrink-0 ml-auto">
                ⌘K
              </div>
            </div>

            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 mx-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden z-[2000]">
                {searchResults.length === 0 ? (
                  <p className="px-4 py-3 text-xs font-bold text-slate-400">
                    No pages match “{searchQuery.trim()}”
                  </p>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => goToResult(item.path)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-500"
                    >
                      <MDBIcon
                        fas
                        icon={item.icon}
                        className="w-4 text-xs opacity-50"
                      />
                      <span className="text-xs font-black">
                        {getTranslation(item.key) || item.title}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="flex items-center gap-1 xs:gap-1.5 sm:gap-4 relative shrink-0"
        >
          <div
            className="hidden md:flex items-center gap-2 mr-2 relative"
            ref={desktopMenuRef}
          >
            {/* Animated Theme Toggle */}
            <MotionButton
              onClick={toggleMode}
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 ${currentMode === "dark" ? "bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]" : "bg-white text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ rotate: 180, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              title="Switch Appearance"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMode}
                  initial={{ y: 5, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -5, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <MDBIcon fas icon={currentMode === "dark" ? "sun" : "moon"} />
                </motion.div>
              </AnimatePresence>
            </MotionButton>

            {/* Lingua Dropdown Switcher (3-Way: EN -> UR -> UR_R) */}
            <div className="relative">
              <MotionButton
                onClick={() => setIsLinguaOpen(!isLinguaOpen)}
                className="h-10 px-4 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 hover:border-blue-500 transition-all gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Change Language"
              >
                <MDBIcon fas icon="globe" className="text-sm opacity-50" />
                <span>
                  {localStorage.getItem("portal-lang") === "ur"
                    ? "اردو"
                    : localStorage.getItem("portal-lang") === "ur_roman"
                      ? "Roman"
                      : "English"}
                </span>
                <MDBIcon
                  fas
                  icon={isLinguaOpen ? "chevron-up" : "chevron-down"}
                  className="ml-1 opacity-30 text-[8px]"
                />
              </MotionButton>

              <AnimatePresence>
                {isLinguaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className={`absolute top-full mt-3 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden z-[2000] ${localStorage.getItem("portal-lang") === "ur" ? "left-0" : "right-0"}`}
                  >
                    {[
                      {
                        id: "en",
                        name: "English",
                        label: "English",
                        icon: "flag-usa",
                      },
                      {
                        id: "ur",
                        name: "اردو",
                        label: "Urdu Script",
                        icon: "pen-nib",
                      },
                      {
                        id: "ur_roman",
                        name: "Roman",
                        label: "Roman Urdu",
                        icon: "keyboard",
                      },
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          applyLanguage(lang.id);
                          setIsLinguaOpen(false);
                          window.location.reload();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${localStorage.getItem("portal-lang") === lang.id ? "text-blue-600 bg-blue-50/20 dark:bg-blue-500/10" : "text-slate-500"}`}
                      >
                        <MDBIcon
                          fas
                          icon={lang.icon}
                          className="text-xs opacity-50 w-4"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-black">
                            {lang.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-widest opacity-50 font-bold">
                            {lang.label}
                          </span>
                        </div>
                        {localStorage.getItem("portal-lang") === lang.id && (
                          <MDBIcon
                            fas
                            icon="check"
                            className="ml-auto text-[10px]"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MotionButton
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/5 bg-transparent`}
              whileHover={{
                scale: 1.1,
                backgroundColor: "var(--surface-card-soft)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <div className="relative inline-flex">
                <MDBIcon fas icon="bell" className="text-slate-500 text-lg" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </div>
            </MotionButton>

          </div>

          {/* Mobile menu toggle */}
          <MotionButton
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden inline-flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-lg xs:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MDBIcon
              fas
              icon={mobileOpen ? "times" : "bars"}
              className="text-sm"
            />
          </MotionButton>

          {mobileOpen && (
            <div
              id="mobile-nav-menu"
              className="md:hidden absolute top-full right-0 mt-2 z-[2000]"
              style={{ width: "min(16rem, calc(100vw - 1rem))" }}
            >
              <div
                className="glass-panel backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  maxHeight: "calc(100dvh - 5.5rem)",
                  overflowY: "auto",
                }}
              >
                <nav className="flex flex-col gap-0.5 p-3">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="nav-item group hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl"
                    >
                      <MDBIcon
                        fas
                        icon={item.icon}
                        className="w-5 text-slate-400 group-hover:text-blue-600 shrink-0"
                      />
                      <span className="truncate text-sm">
                        {getTranslation(item.key) || item.title}
                      </span>
                    </Link>
                  ))}

                  <hr className="my-2 border-slate-200 dark:border-white/10" />

                  {/* Quick Toggles */}
                  <div className="flex items-center gap-2 py-1 px-1">
                    <button
                      onClick={toggleMode}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold transition-all active:scale-95"
                    >
                      <MDBIcon
                        fas
                        icon={currentMode === "dark" ? "sun" : "moon"}
                        className={
                          currentMode === "dark"
                            ? "text-amber-400"
                            : "text-slate-600"
                        }
                      />
                      <span className="truncate">
                        {currentMode === "dark" ? "Solar" : "Night"}
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        const next =
                          localStorage.getItem("portal-lang") === "en"
                            ? "ur"
                            : localStorage.getItem("portal-lang") === "ur"
                              ? "ur_roman"
                              : "en";
                        applyLanguage(next);
                        window.location.reload();
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold transition-all active:scale-95"
                    >
                      <MDBIcon fas icon="language" />
                      <span>
                        {localStorage.getItem("portal-lang") === "en"
                          ? "ENG"
                          : localStorage.getItem("portal-lang") === "ur"
                            ? "اردو"
                            : "ROM"}
                      </span>
                    </button>
                  </div>

                  <hr className="my-2 border-slate-200 dark:border-white/10" />

                  <button
                    onClick={handleLogout}
                    className="nav-item text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 w-full text-left rounded-xl"
                  >
                    <MDBIcon fas icon="sign-out-alt" className="w-5 shrink-0" />
                    <span className="text-sm">{getTranslation("logout")}</span>
                  </button>
                </nav>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 pl-1.5 xs:pl-2 sm:pl-4 border-l border-slate-200/50 dark:border-white/10 shrink-0">
            <div className="hidden lg:flex flex-col items-end leading-tight">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                {user?.fullName || "Student"}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Active Session
                </span>
              </div>
            </div>
            <div className="relative group">
              <div className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[10px] xs:text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 overflow-hidden group-hover:scale-105 transition-transform cursor-pointer">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  user.fullName?.charAt(0) || "S"
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-transparent border-2 border-rose-500/50 text-rose-500 transition-all hover:bg-rose-500/10 hover:scale-110 active:scale-95 shadow-lg shadow-rose-500/5"
            >
              <MDBIcon
                fas
                icon="sign-out-alt"
                className="text-[10px] xs:text-xs sm:text-base"
              />
            </button>
          </div>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
