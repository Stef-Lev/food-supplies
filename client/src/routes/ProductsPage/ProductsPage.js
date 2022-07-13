import React, { useState, useEffect, useContext } from "react";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItem from "../../components/ListItem/ListItem";
import { useNavigate } from "react-router-dom";
import { fetchMethod } from "../../utils/fetchMethod";
import { UserContext } from "../../context/UserContext";
import { FormattedMessage } from "react-intl";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchMethod("get", `/api/user/${user._id}`).then((data) => {
        const sortedProducts = data.user.products.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProducts(sortedProducts);
        setLoading(false);
      });
    }

    return () => (mounted = false);
  }, [user._id]);

  console.log(products);

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>
        <FormattedMessage
          id="products.list.page.title"
          defaultMessage="Products"
        />
      </h2>
      {loading && <AnimatedLoader />}
      {!loading &&
        products?.length > 0 &&
        products.map((item, index) => (
          <ListItem
            key={`list_${index + 1}`}
            data={item}
            icon={<ShoppingCartIcon style={{ color: "white" }} />}
            title={item.title}
            onClick={() => navigate(`/user/product/${item._id}`)}
          />
        ))}
    </div>
  );
}

export default ProductsPage;
