import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, Link, Switch } from "react-router-dom";

const ProductDisplay = (props) => {
  // Deconstruct the props.
  // products - holds product data
  // selectProduct - the function passed down to set the selected product

  const { products, selectProduct } = props;

  let history = useHistory();

  // -- This function will push you to the /products/:prodID/reviews page where you can see the review for a specific item.
  // -- First it will use the selectProduct prop function passed down to send back the current item User selects.
  //-- Then the APP will set the current product and pass that current to ReviewDisplay.js. Then this function pushes you to the URL /products/:prodID/review
  function handleClick(id) {
    console.log("You selected product # ", id);

    const currentProduct = products.filter((item) => {
      return item.id == id;
    });
    selectProduct(currentProduct[0]);
    console.log("PRODUCT DISPLAY current product: ", currentProduct);

    history.push(`/products/${id}/reviews`);
  }

  //----------- LOADED FUNCTION TO USE WHEN PROPS ARE LOADED ------------
  const loaded = () => {
    console.log("Product Display props: ", products);

    const allproducts = products.map((item, index) => {
      return (
        <section className="productCard" key={item.index}>
          <img src={item.img} alt={item.name} />
          <p>{item.name}</p>
          <p>Nmber of Reviews: {item.reviews.length}</p>
          <button
            onClick={() => {
              handleClick(item.id);
            }}
          >
            View Reviews
          </button>
        </section>
      );
    });

    return (
      <div>
        <h2>Product Display</h2>
        {allproducts}
      </div>
    );
  };

  //----------- LOADING FUNCTION TO USE WHEN DATA IS NOT YET LOADED ------------
  const loading = () => {
    return <h2>Loading Data...</h2>;
  };

  //----------- TERNARY OPERATOR TO CHOOSE WHICH FUNCTION TO USE  ------------
  return products.length > 0 ? loaded() : loading();
};

export default ProductDisplay;
