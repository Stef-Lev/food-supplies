import React, { useState, useEffect, useContext } from "react";
import OverviewTable from "../../components/OverviewTable/OverviewTable";
import { UserContext } from "../../context/UserContext";
import { fetchMethod } from "../../utils/fetchMethod";
import styles from "./OverviewPage.module.css";

function OverviewPage() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMethod("get", `/api/user/${user._id}/overview`).then((item) =>
      setData(item)
    );
  }, [user._id]);

  console.log(data);
  return (
    <div>
      <h2 className={styles.title}>Stockpile data</h2>
      {data.length > 0 && <OverviewTable products={data} />}
    </div>
  );
}

export default OverviewPage;
