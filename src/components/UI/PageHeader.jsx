import React from "react";

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <header className="page-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </header>
  );
};

export default PageHeader;
