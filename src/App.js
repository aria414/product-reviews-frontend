import "./App.css";
import React, { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const url = "http://localhost:3000/products/";
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get(url).then((res) => {
      const myproducts = res.data;
      setProducts(myproducts);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("Products states...", products);
  return (
    <div className="App">
      <h1>Product Reviews...</h1>
    </div>
  );
}

export default App;
