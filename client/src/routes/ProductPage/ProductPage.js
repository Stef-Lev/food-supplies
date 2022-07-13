import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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

  console.log(product);

  return (
    <div>
      {/* {product && (
        <>
          <h2>{product.title}</h2>
          <ul>
            {product.lists.map((item) => (
              <li>
                {item.listName}: {item.quantity}
              </li>
            ))}
          </ul>
        </>
      )} */}
    </div>
  );
}

export default ProductPage;
