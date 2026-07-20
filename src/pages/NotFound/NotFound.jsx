import React from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--surface-base)" }}
    >
      <div className="surface-card w-full max-w-md p-6 xs:p-10 text-center shadow-xl">
        <div className="h-14 w-14 xs:h-16 xs:w-16 mx-auto mb-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
          <MDBIcon fas icon="compass" className="text-2xl xs:text-3xl" />
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
          Error 404
        </p>
        <h1
          className="text-2xl xs:text-3xl font-black tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h1>
        <p className="text-xs xs:text-sm font-medium text-slate-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col xs:flex-row gap-3 justify-center">
          <Link to="/" className="btn-ui btn-ui-solid px-6 py-3 rounded-xl">
            Back to Home
          </Link>
          <Link to="/portal" className="btn-ui btn-ui-muted px-6 py-3 rounded-xl">
            Open Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
