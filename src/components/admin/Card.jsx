import React from "react";

const Card = ({ title, num, icon, footer }) => {
  return (
    <div className="card bg-base-100 w-sm shadow-sm transition duration-150 hover:bg-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          {icon}
          <h2 className="text-4xl font-bold">{num}</h2>
        </div>
        <p>{title}</p>
        <div className="card-actions w-full">
          {footer && <div className="w-full"> {footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
