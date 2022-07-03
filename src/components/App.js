import "../App.css";
import {Routes, Route} from 'react-router-dom'
import NavBar from "./NavBar";
import Home from './Home'
import CreateProduct from './CreateProduct'
import UpdateProduct from './UpdateProduct'
import Cart from './Cart'
import ProductPage from './ProductPage'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products/:prodId" element={<ProductPage/>}/>
        <Route exact path="/create-product" element={<CreateProduct/>}/>
        <Route exact path="/update-product/:prodId" element={<UpdateProduct/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
