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
    <div className="bg-white h-screen fixed left-0 top-0 pt-20 w-64 shadow-md z-10 border-r border-gray-100 hidden md:block overflow-y-auto">
      <div className="px-4 py-2">
        <h6 className="text-gray-400 uppercase text-xs font-bold mb-4 px-3 tracking-wider">Main Menu</h6>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
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
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 p-4 rounded-xl text-white shadow-lg shadow-blue-200">
          <p className="text-xs font-bold opacity-75 mb-1 uppercase tracking-tight">Need Support?</p>
          <p className="text-sm font-medium mb-3 leading-tight text-white/90">Contact student services for help with your account.</p>
          <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-2 rounded-lg transition-colors border border-white/20 backdrop-blur-sm">
            Support Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
