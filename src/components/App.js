import "../App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../utils";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import Cart from "./Cart";
import ProductPage from "./ProductPage";

function App() {
  // state for array of products
  const [products, setProducts] = useState([]);

  // hook to fetch products data and set its state
  useEffect(() => {
    Axios.get(BASE_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home products={products} handleSetProducts={setProducts} />}
        />
        <Route exact path="/products/:prodId" element={<ProductPage />} />
        <Route
          exact
          path="/create-product"
          element={
            <CreateProduct
              products={products}
              handleSetProducts={setProducts}
            />
          }
        />
        <Route
          exact
          path="/update-product/:prodId"
          element={
            <UpdateProduct
              products={products}
              handleSetProducts={setProducts}
            />
          }
        />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
