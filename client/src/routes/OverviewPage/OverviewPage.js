import React, { useState, useEffect, useContext } from "react";
import OverviewTable from "../../components/OverviewTable/OverviewTable";
import { UserContext } from "../../context/UserContext";
import { fetchMethod } from "../../utils/fetchMethod";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { MessageContext } from "../../context/MessageContext";
import styles from "./OverviewPage.module.css";

function OverviewPage() {
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}/overview`)
      .then((item) => {
        setProducts(item);
        setLoading(false);
      })
      .catch(() => {
        showMessage("error", "Something went wrong. Please try again later.");
        setLoading(false);
      });
  }, [user._id, showMessage]);

  const prepareData = (type) => {
    const data = [];
    if (type === "quantity") {
      data[0] = ["product", "quantity"];
      products.forEach((item) => {
        data.push([item.product.title, item.quantity]);
      });
      return data;
    } else if (type === "list") {
      data[0] = ["product", "expires"];
      user.list.forEach((item) => {
        data.push([
          item.product.title,
          format(new Date(item.expires), "dd/MM/yyyy"),
        ]);
      });
      return data;
    } else {
      return null;
    }
  };
  // console.log("LIST", user.list, "DATA", products);
  return (
    <div>
      <h2 className={styles.title}>Stockpile data</h2>
      {loading && <AnimatedLoader />}
      {products.length > 0 && (
        <>
          <OverviewTable products={products} />
          <h3>Export data to CSV</h3>
          <div className={styles.btn_container}>
            <div className={styles.export_btn}>
              <CSVLink
                data={prepareData("quantity")}
                download="supplies_quantity"
              >
                Quantities
              </CSVLink>
            </div>
            <div className={styles.export_btn}>
              <CSVLink data={prepareData("list")} download="supplies_list">
                Product List
              </CSVLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OverviewPage;
