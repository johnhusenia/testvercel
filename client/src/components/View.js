import React from "react";

const Adcot = ({ image, title, description }) => {
  return (
    <div className="adcot-container">
      {image && (
        <img className="adcot-image" src={image} alt={title || "Adcot Content"} />
      )}
          {/* Below is a list of items 
      <div className="adcot-details">
        {title && <h2 className="adcot-title">{title}</h2>}
        {description && <p className="adcot-description">{description}</p>}
      </div>*/}
    </div>
  );
};

export default Adcot;
