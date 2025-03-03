import React from "react";

const View = ({ image, title, description }) => {
  return (
    <div className="content-container">
      {image && (
        <img className="content-image" src={image} alt={title || "Content"} />
      )}
      <div className="content-details">
        {title && <h2 className="content-title">{title}</h2>}
        {description && <p className="content-description">{description}</p>}
      </div>
    </div>
  );
};

export default View;
