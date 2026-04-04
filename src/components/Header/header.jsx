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

const Header = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    storage.logout();
    navigate("/login");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
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
      light
      className="sticky top-0 z-40 shadow-sm py-3 border-b h-20 top-nav backdrop-blur-md"
    >
      <MDBContainer fluid className="px-6 md:px-12 flex items-center justify-between">
        <MDBNavbarBrand href="/" className="m-0 p-0 flex items-center group">
          <div className="surface-soft p-2 rounded-xl group-hover:bg-blue-100 transition-colors mr-3 border border-slate-200/70">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
              className="h-8 w-auto object-contain"
              alt="logo"
            />
          </div>
          <span className="text-xl font-black tracking-tight transition-transform group-hover:translate-x-1 duration-200 text-slate-900">
            Student Portal
          </span>
        </MDBNavbarBrand>

        <div ref={mobileMenuRef} className="flex items-center gap-6 relative">
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className="inline-flex items-center justify-center p-2 rounded-lg surface-soft border border-slate-200/70 text-slate-600 hover:bg-slate-100"
          >
            <MDBIcon fas icon={theme === "dark" ? "sun" : "moon"} />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg surface-soft border border-slate-200/70 text-slate-600 hover:bg-slate-100"
          >
            <MDBIcon fas icon={mobileOpen ? "times" : "bars"} />
          </button>

          {mobileOpen && (
            <div
              id="mobile-nav-menu"
              className="md:hidden absolute top-full right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] surface-card shadow-xl rounded-2xl p-3 z-50 border border-slate-200"
            >
              <nav className="flex flex-col gap-2">
                {[
                  { title: "Home", path: "/" },
                  { title: "Portal", path: "/portal" },
                  { title: "Profile", path: "/profile" },
                  { title: "Academic Grades", path: "/grades" },
                  { title: "Class Schedule", path: "/schedule" },
                  { title: "Notifications", path: "/notifications" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="nav-item nav-item-idle"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
          {user && (
            <div className="hidden sm:flex items-center gap-3 surface-soft px-4 py-2 rounded-2xl border border-slate-200/70">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Logged in as
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {user.fullName}
                </span>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-200">
                {user.fullName?.charAt(0) || "S"}
              </div>
            </div>
          )}

          <MDBBtn
            onClick={handleLogout}
            className="m-0 rounded-xl px-6 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border-0 shadow-none hover:shadow-lg hover:shadow-rose-100 transition-all font-bold text-xs tracking-wide uppercase"
          >
            Logout
          </MDBBtn>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
