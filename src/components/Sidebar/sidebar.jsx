import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: "Home", path: "/", icon: "home" },
    { title: "Portal", path: "/portal", icon: "th-large" },
    { title: "Profile", path: "/profile", icon: "user" },
    { title: "Academic Grades", path: "/grades", icon: "poll-h" },
    { title: "Class Schedule", path: "/schedule", icon: "calendar-alt" },
    { title: "Notifications", path: "/notifications", icon: "bell" },
  ];

  return (
    <aside className="surface-card fixed left-0 top-20 h-[calc(100vh-5rem)] pt-2 w-72 shadow-md z-10 border-r border-slate-200 hidden md:block overflow-y-auto">
      <div className="px-4 py-2">
        <h6 className="text-slate-400 uppercase text-xs font-bold mb-4 px-3 tracking-wider">
          Main Menu
        </h6>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item group ${
                location.pathname === item.path
                  ? "nav-item-active"
                  : "nav-item-idle"
              }`}
            >
              <MDBIcon
                fas
                icon={item.icon}
                className={location.pathname === item.path ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}
              />
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-6 py-10">
        <div className="premium-gradient p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20">
          <p className="text-xs font-bold opacity-75 mb-1 uppercase tracking-tight">
            Need Support?
          </p>
          <p className="text-sm font-medium mb-3 leading-tight text-white/90">
            Contact student services for help with your account.
          </p>
          <button className="w-full btn-ui btn-ui-glass py-2">
            Support Center
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
