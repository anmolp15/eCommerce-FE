import React from "react";
import styles from "../css/navbar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">E Commerce</Link>
        </div>

        <div className={styles.utilities}>
          <button className={styles.addAProduct}>
            <Link to={"/create-product"}>Add a Product</Link>
          </button>
          <div className={styles.cart}>
            <Link to="/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </Link>
          </div>
          <div className={styles.user}>
            <i className="fa fa-user-circle" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
