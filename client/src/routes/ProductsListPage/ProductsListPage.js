import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import { UserContext } from "../../context/UserContext";

function ProductsListPage() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const products = ["product1", "product2", "product3"];
  console.log("ID", id, "USER", user);
  return (
    <div>
      {products.map((item, index) => (
        <ProductItem key={index + 1} product={item} />
      ))}
    </div>
  );
}

export default ProductsListPage;
