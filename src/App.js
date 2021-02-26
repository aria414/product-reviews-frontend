import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductDisplay from "./ProductDisplay";
import ReviewDisplay from "./ReviewDisplay";
import { Route, Link, Switch } from "react-router-dom";

function App() {
  const url = "http://localhost:3000/products/";
  const [products, setProducts] = useState([]);

  //Make a state to get the selected product. Will pass this product down to the ReviewDisplay.js
  const [selectedProduct, setSelectedProduct] = useState({});

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
      </Switch>
    </div>
  );
}

export default App;
