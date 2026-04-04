import React from "react";

const PageLoader = ({ label = "Loading" }) => {
  return (
    <div className="surface-card rounded-3xl p-8 flex items-center gap-3 justify-center border border-slate-200">
      <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
      <span className="h-2.5 w-2.5 rounded-full bg-blue-400 animate-pulse [animation-delay:120ms]" />
      <span className="h-2.5 w-2.5 rounded-full bg-blue-300 animate-pulse [animation-delay:240ms]" />
      <p className="text-sm font-bold text-slate-500 ml-2">{label}</p>
    </div>
  );
};

export default PageLoader;
