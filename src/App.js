import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDisplay from "./ProductDisplay";
import ReviewDisplay from "./ReviewDisplay";
import Form from "./Form";
import { Route, Link, Switch } from "react-router-dom";

function App() {
  const url = "http://localhost:3000/products/";

  //Make a state to hold all of the products after fetch from database.
  const [products, setProducts] = useState(null);

  //Make a state to get the selected product. Will pass this product down to the ReviewDisplay.js
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to set the state for selected product. This function is passed down to ProductDisplay.js so that each mapped item can have access to this function to be selected.
  // There will be a button next to each mapped item so when clicked, it will activate this function and get the current item with FILTER
  const selectProduct = (current) => {
    setSelectedProduct(current);
    console.log("APP - Selected product: ", selectedProduct);
  };

  // ---------- GET ROUTE to fetch product date ----------
  const getProducts = () => {
    axios.get(url).then((res) => {
      const myproducts = res.data;
      setProducts(myproducts);
    });
  };

  // ------  CREATE ROUTE ------
  const handleCreate = async (newReview) => {
    //The review data includes the product_id but we are not trying to push that into the database...Just map out the data needed.
    const reviewData = {
      title: newReview.title,
      author: newReview.author,
      content: newReview.content,
    };

    //We need to grab product_id to use in the create route URL
    const productID = newReview.product_id;

    //Pass in the ID to the CREATE ROUTE and pass in the cleaned data
    await fetch(url + productID + "/reviews", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }).then(() => {
      getProducts();
    });

    console.log("New Review written: ", newReview);
  };

  // ---------- VARIABLE TO MAKE A PLACEHOLDER REVIEW ------

  useEffect(() => {
    getProducts();
  }, []);

  //console.log("Products states...", products);
  return (
    <div className="App">
      <h1>Product Reviews...</h1>
      <Link to="/">
        <div>Home</div>
      </Link>

      <Switch>
        <Route exact path="/">
          <ProductDisplay products={products} selectProduct={selectProduct} />
        </Route>

        <Route
          path="/products/:id/reviews"
          render={(routerProps) => (
            <ReviewDisplay {...routerProps} currentProduct={selectedProduct} />
          )}
        />
        <Route
          exact
          path="/createreviews/:id"
          render={(rp) => (
            <Form {...rp} label="create" handleSubmit={handleCreate} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
