import React from "react";
import { useSelector } from "react-redux";
import styles from "../css/cart.module.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);

  function getNetAmount() {
    let sum = 0;
    cartItems.forEach(item => {
      sum += item.price;
    });
    return sum;
  }

  return (
    <div className={styles.container}>
      {cartItems.map((item, index) => {
        return (
          <div className={styles.cartItem} key={index}>
            <div className={styles.itemWrapper}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.title} />
              </div>
              <div>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemPrice}>$ {item.price}</div>
              </div>
            </div>
            <div className={styles.itemDelete}>
              <button>
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.totalAmount}>Total : $ {getNetAmount()}</div>
    </div>
  );
}
