import React, { useState, useEffect, useContext } from "react";
import { fetchMethod } from "../../utils/fetchMethod";
import { UserContext } from "../../context/UserContext";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchMethod("get", `/api/user/${user._id}`).then((data) =>
        setProducts(data.user.products)
      );
    }

    return () => (mounted = false);
  }, [user._id]);

  return (
    <div>
      <h2>ProductPage</h2>

      {products &&
        products.length > 0 &&
        products.map((item, index) => (
          <p key={`product_${index + 1}`}>{item.title}</p>
        ))}
    </div>
  );
}

export default ProductsPage;
