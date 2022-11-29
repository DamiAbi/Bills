import React from "react";

import "../pages/login/cards-style.css";

const Cards = (props) => {
  return (
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={props.imgsrc} alt="image1" className="card-img-top" />
      </div>
      <div className="card-body text-dark">
        <h4 className="card-tile">{props.title}</h4>
        <p className="card-text text-secondary">{props.p}</p>
      </div>
    </div>
  );
};
export default Cards;
