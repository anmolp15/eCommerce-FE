import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/product-page.module.css";
import { BASE_URL } from "../utils";
export default function ProductPage() {
  const { prodId } = useParams();
  const [product, setProduct] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });
  useEffect(() => {
    console.log(`${BASE_URL}/${prodId}`);
    Axios.get(`${BASE_URL}/${prodId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [prodId]);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={product.image} alt="product" />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.rating}>
            <div className={styles.rate}>
              <i className="fa fa-star" aria-hidden="true"></i>{" "}
              {product.rating.rate}
            </div>
            <div className={styles.rate}>{product.rating.count} ratings</div>
          </div>
          <div className={styles.price}>
            <span>$ </span>
            {product.price}
          </div>
          <div className={styles.description}>{product.description}</div>
          <button className={styles.addToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}