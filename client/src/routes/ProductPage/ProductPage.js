import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./ProductPage.module.css";

function ProductPage() {
  const { user } = useContext(UserContext);
  const { productid } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const foundProduct = user.products.find((prod) => prod._id === productid);
      setProduct(foundProduct);
    }

    return () => (mounted = false);
  }, [productid, user.products]);

  if (product._id) {
    console.log(
      "lists",
      product,
      product.lists.map((item) => item)
    );
  }

  return (
    <div className={styles.product_info_container}>
      {product._id && (
        <>
          <h2>{product.title}</h2>
          <ul>
            {product.lists.map((item, index) => (
              <li key={`product_${index + 1}`}>{item.listName}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProductPage;
