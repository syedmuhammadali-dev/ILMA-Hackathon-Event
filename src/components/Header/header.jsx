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

const Header = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLinguaOpen, setIsLinguaOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState(localStorage.getItem("portal-mode") || "dark");
  const mobileMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  const toggleMode = () => {
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    setCurrentMode(newMode);
    applyMode(newMode);
  };

  const mockNotifications = [
    {
      id: 1,
      title: "New Assignment",
      desc: "React basic concepts assignment is due.",
      time: "2 mins ago",
      icon: "tasks",
      color: "blue"
    },
    {
      id: 2,
      title: "Portal Update",
      desc: "Spring Hackathon 2026 registration is live.",
      time: "1 hour ago",
      icon: "rocket",
      color: "purple"
    },
    {
      id: 3,
      title: "Attendance Alert",
      desc: "Your attendance is above 90% this month.",
      time: "5 hours ago",
      icon: "user-check",
      color: "emerald"
    }
  ];

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
        cancelButton: "rounded-xl px-6 py-3 font-bold"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        storage.logout();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    // initializeTheme() can also be called here if needed, but App.jsx handles it.
    // Sync local state if storage changes
    const savedMode = localStorage.getItem("portal-mode") || "dark";
    setCurrentMode(savedMode);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
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
      className="z-[100] h-20 glass-panel border-b premium-shadow w-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <MDBContainer fluid className="px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <MotionDiv whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <MDBNavbarBrand href="/" className="m-0 p-0 flex items-center group">

              <img
                src={Logo}
                className="h-10 w-auto object-contain"
                alt="University Logo"
              />

              <div className="flex flex-col ml-1 me-5">
                <span className="text-xl font-black tracking-tight leading-none text-slate-900 dark:text-black">
                  Student<span className="text-blue-600">Portal</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 mt-1">
                  University Admin
                </span>
              </div>
            </MDBNavbarBrand>
          </MotionDiv>

          {/* New Search Element */}
          <div className="hidden md:flex search-container ml-12">
            <MDBIcon fas icon="search" className="text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search courses, grades, or resources..."
              className="bg-transparent border-none outline-none text-sm w-full font-bold placeholder:text-slate-400"
              style={{ color: 'var(--text-primary)' }}
            />
            <div className="px-1.5 py-0.5 rounded-md bg-slate-200/50 text-[10px] font-bold text-slate-500 border border-slate-300/30">
              ⌘K
            </div>
          </div>
        </div>

        <div ref={mobileMenuRef} className="flex items-center gap-4 relative">
          <div className="hidden md:flex items-center gap-2 mr-2 relative" ref={notificationsRef}>
            {/* Animated Theme Toggle */}
            <MotionButton
              onClick={toggleMode}
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/10 ${currentMode === 'dark' ? 'bg-slate-800 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]' : 'bg-white text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.1)]'}`}
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
                    <MDBIcon fas icon={currentMode === 'dark' ? 'sun' : 'moon'} />
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
                    {localStorage.getItem("portal-lang") === 'ur' ? 'اردو' : 
                     localStorage.getItem("portal-lang") === 'ur_roman' ? 'Roman' : 'English'}
                 </span>
                 <MDBIcon fas icon={isLinguaOpen ? "chevron-up" : "chevron-down"} className="ml-1 opacity-30 text-[8px]" />
              </MotionButton>

              <AnimatePresence>
                {isLinguaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className={`absolute top-full mt-3 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden z-[2000] ${localStorage.getItem("portal-lang") === 'ur' ? 'left-0' : 'right-0'}`}
                  >
                    {[
                      { id: 'en', name: 'English', label: 'English', icon: 'flag-usa' },
                      { id: 'ur', name: 'اردو', label: 'Urdu Script', icon: 'pen-nib' },
                      { id: 'ur_roman', name: 'Roman', label: 'Roman Urdu', icon: 'keyboard' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          applyLanguage(lang.id);
                          setIsLinguaOpen(false);
                          window.location.reload();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${localStorage.getItem("portal-lang") === lang.id ? 'text-blue-600 bg-blue-50/20 dark:bg-blue-500/10' : 'text-slate-500'}`}
                      >
                        <MDBIcon fas icon={lang.icon} className="text-xs opacity-50 w-4" />
                        <div className="flex flex-col">
                          <span className="text-xs font-black">{lang.name}</span>
                          <span className="text-[8px] uppercase tracking-widest opacity-50 font-bold">{lang.label}</span>
                        </div>
                        {localStorage.getItem("portal-lang") === lang.id && <MDBIcon fas icon="check" className="ml-auto text-[10px]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MotionButton
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-white/5 ${isNotificationsOpen ? 'bg-slate-100 dark:bg-slate-800' : 'bg-transparent'}`}
              whileHover={{ scale: 1.1, backgroundColor: "var(--surface-card-soft)" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Notifications"
            >
              <div className="relative">
                <MDBIcon fas icon="bell" className={isNotificationsOpen ? 'text-blue-600' : 'text-slate-500'} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </div>
            </MotionButton>

            {/* Notification Dropdown Panel */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  className="absolute top-full right-0 mt-3 w-[480px] bg-white border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[2000] overflow-hidden rounded-xl"
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-black text-[8px] text-slate-400 uppercase tracking-widest">{getTranslation('system_alerts')}</h3>
                    <div className="text-[8px] font-bold text-blue-600 bg-blue-50/50 px-1.5 rounded-full border border-blue-100">
                      3 NEW
                    </div>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">
                    {mockNotifications.map((n, idx) => (
                      <div
                        key={n.id}
                        className={`px-3 py-1.5 hover:bg-slate-50 transition-colors cursor-pointer group relative ${idx !== mockNotifications.length - 1 ? 'border-b border-slate-50' : ''}`}
                      >
                        <div className="flex gap-2.5 items-center">
                          <div className={`h-6 w-6 min-w-[1.5rem] rounded bg-${n.color}-50 flex items-center justify-center border border-${n.color}-100`}>
                            <MDBIcon fas icon={n.icon} className={`text-[9px] text-${n.color}-500`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="text-[10px] font-black text-slate-800 truncate pr-3">{n.title}</p>
                              <span className="text-[8px] text-slate-400 font-bold shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[9px] text-slate-500 font-bold truncate leading-none">
                              {n.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="py-2 text-center bg-slate-50/20">
                    <button
                      onClick={() => {
                        navigate("/notifications");
                        setIsNotificationsOpen(false);
                      }}
                      className="text-[9px] font-bold text-blue-500 hover:underline uppercase tracking-tighter"
                    >
                      View Complete History
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Mobile menu toggle */}
          <MotionButton
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden inline-flex icon-btn border-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MDBIcon fas icon={mobileOpen ? "times" : "bars"} />
          </MotionButton>

          {mobileOpen && (
            <div
              id="mobile-nav-menu"
              className="md:hidden absolute top-full right-0 mt-3 w-64 glass-panel backdrop-blur-xl bg-white dark:bg-slate-900 premium-shadow rounded-2xl p-4 z-[2000] border border-slate-200 dark:border-white/10"
            >
              <nav className="flex flex-col gap-1">
                {[
                  { title: "Home", key: 'dashboard', path: "/", icon: "home" },
                  { title: "Portal", key: 'portal', path: "/portal", icon: "th-large" },
                  { title: "Profile", key: 'profile', path: "/profile", icon: "user" },
                  { title: "Grades", key: 'grades', path: "/grades", icon: "poll-h" },
                  { title: "Financial", key: 'financial', path: "/financial", icon: "wallet" },
                  { title: "Assignments", key: 'assignments', path: "/assignments", icon: "tasks" },
                  { title: "Schedule", key: 'schedule', path: "/schedule", icon: "calendar-alt" },
                  { title: "Campus Pulse", key: 'campus', path: "/campus-pulse", icon: "heartbeat" },
                  { title: "Notifications", key: 'notifications', path: "/notifications", icon: "bell" },
                  { title: "Appearance", key: 'appearance', path: "/appearance", icon: "paint-brush" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="nav-item group hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <MDBIcon fas icon={item.icon} className="w-5 text-slate-400 group-hover:text-blue-600" />
                    {getTranslation(item.key) || item.title}
                  </Link>
                ))}
                
                <hr className="my-2 border-slate-200/50" />
                
                {/* Mobile Quick Toggles */}
                 <div className="flex items-center gap-3 py-2 px-3">
                   <button onClick={toggleMode} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold transition-all active:scale-95">
                     <MDBIcon fas icon={currentMode === 'dark' ? 'sun' : 'moon'} className={currentMode === 'dark' ? 'text-amber-400' : 'text-slate-600'} />
                     {currentMode === 'dark' ? (getTranslation('light_mode') || 'Solar') : (getTranslation('dark_mode') || 'Lunar')}
                   </button>
                   <button onClick={() => {
                        const next = localStorage.getItem("portal-lang") === 'en' ? 'ur' : localStorage.getItem("portal-lang") === 'ur' ? 'ur_roman' : 'en';
                        applyLanguage(next);
                        window.location.reload();
                     }} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-bold transition-all active:scale-95">
                     <MDBIcon fas icon="language" />
                     {localStorage.getItem("portal-lang") === 'en' ? 'ENG' : localStorage.getItem("portal-lang") === 'ur' ? 'اردو' : 'ROM'}
                   </button>
                 </div>

                <hr className="my-2 border-slate-200/50" />
                <button
                  onClick={handleLogout}
                  className="nav-item text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 w-full text-left"
                >
                  <MDBIcon fas icon="sign-out-alt" className="w-5" />
                  {getTranslation('logout')}
                </button>
              </nav>
            </div>
          )}

          <div className="flex items-center gap-4 pl-4 border-l border-slate-200/50">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">
                {user.fullName}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Active Session
                </span>
              </div>
            </div>
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30 overflow-hidden group-hover:scale-105 transition-transform cursor-pointer">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  user.fullName?.charAt(0) || "S"
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-transparent border-2 border-rose-500/50 text-rose-500 transition-all hover:bg-rose-500/10 hover:scale-110 active:scale-95 shadow-lg shadow-rose-500/5"
            >
              <MDBIcon fas icon="sign-out-alt" />
            </button>
          </div>

        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
