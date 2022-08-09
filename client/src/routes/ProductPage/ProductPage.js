import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import QuantityItem from "../../components/QuantityItem/QuantityItem";
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
  // TODO Add about to expire

  return (
    <div className={styles.product_page}>
      {product._id && (
        <div className={styles.product_info_container}>
          <h2 className={styles.title}>{product.title}</h2>
          <img
            className={styles.product_image}
            src="/placeholder-image.jpeg"
            alt="product"
          />
          <div className={styles.table_head}>
            <div>List</div>
            <div>Items</div>
          </div>
          <div>
            {product.lists.map((item, index) => (
              <QuantityItem
                key={`product_${index + 1}`}
                href={`/user/list/${item._id}`}
                list={item.listName}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
