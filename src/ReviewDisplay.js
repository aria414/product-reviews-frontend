import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";

const ReviewDisplay = (props) => {
  const { currentProduct } = props;
  //console.log("REVIEW DISPLAY all props - ", props);

  const prodID = props.match.params.id;
  //console.log("REVIEW DISPLAY product ID: ", prodID);
  console.log("REVIEW DISPLAY currentProduct- ", currentProduct);

  const reviews = currentProduct.reviews.map((item, index) => {
    return (
      <div>
        <h3 key={index}>
          Review {item.id}: {item.title}
        </h3>
        <p>{item.content}</p>
      </div>
    );
  });

  //console.log("REVIEW DISP reviews: ", reviews);
  // If there are no reviews for product, display No Reviews! otherwise display the reviews array
  return (
    <div>
      <h2>
        Product {prodID} {currentProduct.name}
      </h2>
      <section>
        {currentProduct.reviews.length > 0 ? reviews : <h3>No Reviews!</h3>}
      </section>
    </div>
  );
};

export default ReviewDisplay;