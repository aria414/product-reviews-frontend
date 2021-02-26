import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDisplay from "./ProductDisplay";
import ReviewDisplay from "./ReviewDisplay";
import Form from "./Form";
import { Route, Link, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();

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
    const productID = newReview.id_represented;

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

  // ------ UPDATE ROUTE -------
  const handleUpdate = async (updateReview) => {
    const reviewData = {
      title: updateReview.title,
      author: updateReview.author,
      content: updateReview.content,
    };
    //We need to grab product_id to use in the create route URL
    const reviewID = parseInt(updateReview.id_represented, 10);

    //Pass in the ID to the UPDATE ROUTE and pass in the cleaned data
    await fetch("http://localhost:3000" + "/reviews/" + reviewID, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }).then(() => {
      getProducts();
    });
    console.log("Review Updated: ", updateReview, " ID: ", reviewID);
  };

  // ------ DELETE ROUTE ------
  const deleteReview = (urlID) => {
    fetch("http://localhost:3000" + "/reviews/" + urlID, {
      method: "delete",
    }).then(() => {
      history.push("/");
      getProducts();
    });

    console.log("Deleted review ID ", urlID);
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
            <ReviewDisplay
              {...routerProps}
              currentProduct={selectedProduct}
              deleteReview={deleteReview}
            />
          )}
        />
        <Route
          exact
          path="/createreviews/:id"
          render={(rp) => (
            <Form {...rp} label="create" handleSubmit={handleCreate} />
          )}
        />
        <Route
          exact
          path="/reviews/:id"
          render={(rp) => (
            <Form {...rp} label="update" handleSubmit={handleUpdate} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
