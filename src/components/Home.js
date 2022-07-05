import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import styles from "../css/home.module.css";
import ProductItem from "./ProductItem";


export default function Home(props) {
  const products = props.products;
  const handleSetProducts = props.handleSetProducts;
  const handleProductDelete = props.handleProductDelete;
  // state for list of categories to be displayed in drop down menu
  const [categories, setCategories] = useState([]);
  // state for selected category by user
  const [selectedCaregory, setSelectedCategory] = useState("");

  
  // hook to fetch all categories and set their state
  useEffect(() => {
    let url = `${BASE_URL}/categories`;
    Axios.get(url).then((categ) => setCategories(categ.data));
  }, []);

  

  // function to display all products on home page using products state
  function populateDOM(products) {
    // map over the array and return a new Product Item component 
    return products.map((item, index) => {
      return <ProductItem item={item} index = {index}  handleProductDelete = {handleProductDelete}/>
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