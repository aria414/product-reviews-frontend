import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";
import Form from "./Form";

const ReviewDisplay = (props) => {
  const { currentProduct } = props;
  //console.log("REVIEW DISPLAY all props - ", props);

  let history = useHistory();

  const prodID = props.match.params.id;
  //console.log("REVIEW DISPLAY product ID: ", prodID);
  console.log("REVIEW DISPLAY currentProduct- ", currentProduct);

  const clickUpdate = (id) => {
    console.log("You selected review # ", id);
    history.push(`/reviews/${id}`);
  };

  const clickDelete = (id) => {
    props.deleteReview(id);
  };
  //----------- LOADED FUNCTION TO USE WHEN PROPS ARE LOADED ------------
  const loaded = () => {
    const reviews = currentProduct.reviews.map((item, index) => {
      return (
        <div className="review">
          <h3 key={index}>
            Review # {item.id}: {item.title}
          </h3>
          <p>By: {item.author}</p>
          <p>Says: {item.content}</p>
          <button onClick={() => clickUpdate(item.id)}>Update Review</button>
          <button onClick={() => clickDelete(item.id)}>Delete Review</button>
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

  //----------- LOADING FUNCTION TO USE WHEN DATA IS NOT YET LOADED ------------
  const loading = () => {
    return <h2>Loading Data...</h2>;
  };

  //----------- TERNARY OPERATOR TO CHOOSE WHICH FUNCTION TO USE  ------------
  return currentProduct ? loaded() : loading();
};

export default ReviewDisplay;
