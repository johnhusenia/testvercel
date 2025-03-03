import React from "react";

const View = ({ image, title, description }) => {
  return (
    <div className="advertisement-container">
      {image && (
        <img className="advertisement-image" src={image} alt={title || "Advertisement"} />
      )}
      <div className="advertisement-content">
        {title && <h2 className="advertisement-title">{title}</h2>}
        {description && <p className="advertisement-description">{description}</p>}
      </div>
    </div>
  );
};

export default View;