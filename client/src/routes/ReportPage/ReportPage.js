import React, { useState, useEffect, useContext } from "react";
import ReportTable from "../../components/ReportTable/ReportTable";
import { UserContext } from "../../context/UserContext";
import { fetchMethod } from "../../utils/fetchMethod";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/core";
import textFieldStyle from "../../utils/textFieldStyle";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import { MessageContext } from "../../context/MessageContext";
import styles from "./ReportPage.module.css";

function ReportPage() {
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(true);
  const [userLists, setUserLists] = useState([]);
  const [selectedList, setSelectedList] = useState(user?.lists[0]?._id || null);
  const [quantityData, setQuantityData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const useStyles = makeStyles((theme) => createStyles(textFieldStyle));
  const classes = useStyles();

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}/getlists`)
      .then((data) => {
        setUserLists(data.lists);
        setLoading(false);
      })
      .catch(() => {
        showMessage(
          "error",
          <FormattedMessage
            id="generic.error"
            defaultMessage="Something went wrong. Please try again later."
          />
        );
        setLoading(false);
      });
  }, [showMessage, user._id]);

  useEffect(() => {
    if (selectedList) {
      setLoading(true);
      fetchMethod("get", `/api/user/${user._id}/list/${selectedList}`)
        .then((data) => {
          setQuantityData(data.quantities);
          setTotalData(data.list.items);
          setLoading(false);
        })
        .catch(() => {
          showMessage(
            "error",
            <FormattedMessage
              id="generic.error"
              defaultMessage="Something went wrong. Please try again later."
            />
          );
          setLoading(false);
        });
    }
  }, [user._id, showMessage, selectedList]);

  const prepareData = (type) => {
    const data = [];
    if (type === "quantity") {
      data[0] = ["product", "quantity"];
      quantityData.forEach((item) => {
        data.push([item.product.title, item.quantity]);
      });
      const sortedData = data.sort((a, b) => b[1] - a[1]);
      return sortedData;
    } else if (type === "list") {
      data[0] = ["product", "expires"];
      totalData.forEach((item) => {
        data.push([
          item.product.title,
          format(new Date(item.expires), "dd/MM/yyyy"),
        ]);
      });
      const sortedData = data.sort((a, b) => {
        const newA = a[1].split("/").reverse().join("-");
        const newB = b[1].split("/").reverse().join("-");
        return +new Date(newA) - +new Date(newB);
      });
      return sortedData;
    } else {
      return null;
    }
  };

  const handleListSelect = (e) => {
    setSelectedList(e.target.value);
  };

  return (
    <div>
      <h2 className={styles.title}>
        <FormattedMessage id="reports.page.title" defaultMessage="Reports" />
      </h2>
      {!loading && userLists.length === 0 && (
        <p>
          <FormattedMessage
            id="reports.page.noLists"
            defaultMessage="No lists added yet"
          />
        </p>
      )}
      {userLists.length > 0 && (
        <FormControl
          variant="outlined"
          className={styles.dropdown}
          classes={{
            root: classes.filters,
          }}
          style={{ width: "60%" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            <FormattedMessage
              id="reports.page.input.select"
              defaultMessage="Select list"
            />
          </InputLabel>
          <Select
            id="demo-simple-select-outlined"
            value={selectedList}
            onChange={handleListSelect}
            label={
              <FormattedMessage
                id="reports.page.input.select"
                defaultMessage="Select list"
              />
            }
          >
            {user.lists.map((item, index) => (
              <MenuItem key={index + 1} value={item._id}>
                {item.listName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {loading && <AnimatedLoader />}
      {!loading && quantityData.length > 0 && (
        <>
          <ReportTable products={quantityData} />
          <div className={styles.csv_container}>
            <h3 className={styles.btn_title}>
              <FormattedMessage
                id="reports.page.export.title"
                defaultMessage="Export data to CSV"
              />
            </h3>
            <div className={styles.btn_container}>
              <div className={styles.export_btn}>
                <CSVLink data={prepareData("list")} download="supplies_list">
                  <FormattedMessage
                    id="reports.page.export.prodList"
                    defaultMessage="List Only"
                  />
                </CSVLink>
              </div>
              <div className={styles.export_btn}>
                <CSVLink
                  data={prepareData("quantity")}
                  download="supplies_quantity"
                >
                  <FormattedMessage
                    id="reports.page.export.quantities"
                    defaultMessage="Quantities"
                  />
                </CSVLink>
              </div>
            </div>
          </div>
        </>
      )}
      {!loading && userLists.length !== 0 && quantityData.length === 0 && (
        <p>
          <FormattedMessage
            id="reports.page.noProducts"
            defaultMessage="This list has no products added"
          />
        </p>
      )}
    </div>
  );
}

export default ReportPage;
