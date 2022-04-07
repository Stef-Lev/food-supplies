import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import AddIconButton from "../../components/AddIconButton/AddIconButton";
import { UserContext } from "../../context/UserContext";
import styles from "./ProductsListPage.module.css";

function ProductsListPage() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const products = user.list;
  return (
    <div className={styles.column}>
      {products.map((item, index) => (
        <ProductItem key={index + 1} item={item} />
      ))}
      <AddIconButton />
    </div>
  );
}

export default ProductsListPage;
