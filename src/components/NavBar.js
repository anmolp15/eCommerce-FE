import React, { useEffect, useState } from "react";
import styles from "../css/navbar.module.css";
import Axios from "axios";

const BASE_URL = "https://fakestoreapi.com/products";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let url = `${BASE_URL}/categories`;
    Axios.get(url).then((categ) => setCategories(categ.data));
  }, []);

  function listCategories() {
    return (
      <select name="category" id="category">
        <option value="none" selected disabled>
          All categories
        </option>
        {categories.map((item, index) => {
          return (
            <option value="item" key={index}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>E Commerce</div>

        <div className={styles.utilities}>
          <div className={styles.categories}>{listCategories()}</div>
          <div className={styles.cart}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </div>
          <div className={styles.user}>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
