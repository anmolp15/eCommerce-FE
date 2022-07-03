import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import styles from "../css/home.module.css";
import { Link } from "react-router-dom";

export default function Home(props) {
  const products = props.products;
  const handleSetProducts = props.handleSetProducts 

  // state for list of categories to be displayed in drop down menu
  const [categories, setCategories] = useState([]);
  // state for selected category by user
  const [selectedCaregory, setSelectedCategory] = useState("");

  
  // hook to fetch all categories and set their state
  useEffect(() => {
    let url = `${BASE_URL}/categories`;
    Axios.get(url).then((categ) => setCategories(categ.data));
  }, []);

  // function to send delete request to server using product id
  function handleProductDelete(id) {
    Axios.delete(`${BASE_URL}/${id}`)
      .then(() => alert("Product Deleted!"))
      .catch((err) => console.log(err));
  }

  // function to display all products on home page using products state
  function populateDOM(products) {
    // map over the array and return each created product in jsx
    return products.map((item, index) => {
      return (
        <div className={styles.product} key={index}>
          <div className={styles.productImage}>
            <img src={item.image} alt="item" />{" "}
          </div>
          <div className={styles.productTitle}>
            <Link to={`/products/${item.id}`}>{item.title}</Link>
          </div>
          <div className={styles.productCategory}>({item.category})</div>
          <div className={styles.price}>
            <span>$ </span> {item.price}
          </div>
          <div className={styles.ratings}>
            <div className={styles.rate}>
              <i className="fa fa-star" aria-hidden="true"></i>{" "}
              {item.rating.rate}
            </div>
            <div className={styles.count}>{item.rating.count} ratings</div>
          </div>
          <div className={styles.btns}>
            <button className={styles.editProduct}>
              <Link to={`/update-product/${item.id}`}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </Link>
            </button>
            <button
              className={styles.deleteProduct}
              onClick={() => handleProductDelete(item.id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
            <button className={styles.addToCart}>
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    });
  }

  // function to fetch and display products of specified category
  // todo................
  function displayCategoryProducts() {
    console.log(`selectedCaregory from state - ${selectedCaregory}`);
    if (selectedCaregory === "") {
      return;
    }
    console.log(`${BASE_URL}/category/${selectedCaregory}`);
    Axios.get(`${BASE_URL}/category/${selectedCaregory}`).then((res) => {
      handleSetProducts(res.data);
    });
  }

  // function to create select menu options using categories state
  function listCategories() {
    return (
      <select
        name="category"
        id="category"
        defaultValue="All categories"
        onChange={(e) => {
          console.log("chosen option - " + e.target.value);
          let val = e.target.value;
          setSelectedCategory(val);
          displayCategoryProducts();
        }}
      >
        <option value="">All Categories</option>
        {categories.map((item, index) => {
          return (
            <option value={item} key={index}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  }

  // sort products by price functionality 
  // todo...............
  function handleSortProducts() {
    let sortedProducts = products.sort((a, b) => {
      return a.price - b.price;
    });
    console.log(sortedProducts)
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <button className={styles.sortByPrice} onClick={handleSortProducts}>
          Sort By Price
        </button>
        <div className={styles.categories}>{listCategories()}</div>
      </div>
      <div className={styles.container}>{populateDOM(products)}</div>
    </div>
  );
}
