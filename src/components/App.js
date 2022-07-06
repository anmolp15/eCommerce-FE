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
import Login from "./Login";

function App() {
  // state for array of products
  const [products, setProducts] = useState([]);
  // to maintain login state and achieve conditional rendering
  const [loggedIn, setLoggedIn] = useState(false);
  // hook to fetch products data and set its state
  useEffect(() => {
    Axios.get(BASE_URL)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // function to send delete request to server using product id
  function handleProductDelete(id) {
    Axios.delete(`${BASE_URL}/${id}`)
      .then(() => alert("Product Deleted!"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      {/* navbar component which will be rendered in all cases out of routes */}
      <NavBar loggedIn={loggedIn} handleSetLoggedIn={setLoggedIn} />
      <Routes>
        {/* route to render Home component */}
        <Route
          exact
          path="/"
          element={
            <Home
              products={products}
              handleSetProducts={setProducts}
              handleProductDelete={handleProductDelete}
            />
          }
        />
        {/* route to render a specific product component */}
        <Route exact path="/products/:prodId" element={<ProductPage />} />
        {/* route to create a new product */}
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
        {/* route to update the specific component */}
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
        {/* rout to cart componet  */}
        <Route exact path="/cart" element={<Cart />} />
        {/* route to login page   */}
        <Route
          exact
          path="/login"
          element={
            <Login loggedIn={loggedIn} handleSetLoggedIn={setLoggedIn} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
