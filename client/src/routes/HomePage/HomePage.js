import React, { useState, useEffect, useContext } from "react";
import { homeTilesData, tileColorsArray } from "../../utils/homeTilesData";
import HomeTile from "../../components/HomeTile/HomeTile";
import { UserContext } from "../../context/UserContext";
import ExpiryInfoModal from "../../components/ExpiryInfoModal/ExpiryInfoModal";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import brandBtnStyle from "../../utils/brandBtnStyle";
import { FormattedMessage } from "react-intl";
import { differenceInDays, isToday } from "date-fns";
import { MessageContext } from "../../context/MessageContext";
import useLogout from "../../utils/useLogout";
import styles from "./HomePage.module.css";

function HomePage() {
  const hasSeenInfoModal = () => {
    const lastSeenModalDate = new Date(localStorage.getItem("lastSeenModal"));
    return isToday(lastSeenModalDate);
  };

  const [modalOpen, setModalOpen] = useState(!hasSeenInfoModal());
  const [expired, setExpired] = useState([]);
  const { user } = useContext(UserContext);
  const { showMessage } = useContext(MessageContext);
  const { logoutUser } = useLogout();

  useEffect(() => {
    let mounted = true;

    if (mounted && user && user.lists.length > 0) {
      const expiredProducts = [];
      for (let i = 0; i < user.lists.length; i++) {
        let listObj = { name: user.lists[i].listName, products: [] };
        for (let j = 0; j < user.lists[i].items.length; j++) {
          if (
            getDaysBeforeExpiration(user.lists[i].items[j]) > 0 &&
            getDaysBeforeExpiration(user.lists[i].items[j]) <= 7
          ) {
            listObj.products.push(user.lists[i].items[j]);
          }
        }
        if (listObj.products.length > 0) {
          expiredProducts.push(listObj);
        }
      }
      setExpired(expiredProducts);
    }

    return () => (mounted = false);
  }, [user]);

  const handleModalClose = () => {
    localStorage.setItem("lastSeenModal", new Date());
    setModalOpen(false);
  };

  const getDaysBeforeExpiration = (product) => {
    const today = new Date();
    const expirationDate = new Date(product.expires);
    return differenceInDays(expirationDate, today);
  };

  const warnBeforeDeleting = () => {
    showMessage(
      "warning",
      <FormattedMessage
        id="generic.logout.warning"
        defaultMessage="Do you want to logout?"
      />,
      () => logoutUser()
    );
  };

  return (
    <div className={styles.home_page}>
      <div className={styles.svg_container}>
        <svg height="100%" width="200px" className={styles.color_path}>
          <circle
            cx="20%"
            cy="40"
            r="80"
            fill="#80DBD8"
            className={styles.mobile}
          />
          <circle
            cx="150"
            cy="40"
            r="80"
            width="500px"
            fill="#80DBD8"
            className={styles.desktop}
          />
        </svg>
      </div>
      <h1 className={styles.home_brand}>
        <span className={styles.animated_dot}>.</span>amalthea
      </h1>
      <h2 className={styles.home_subtitle}>
        <FormattedMessage
          id="home.page.text.appDescription"
          defaultMessage="Wrong formatted message"
        />
      </h2>
      <div className={styles.tiles_container}>
        {homeTilesData.map((item, index) => (
          <HomeTile
            key={`tile_${index}`}
            intlId={item.intlId}
            defaultMsg={item.defaultMsg}
            icon={item.icon}
            href={item.href}
            color={tileColorsArray[index]}
          />
        ))}
      </div>
      <div className={styles.logout_container}>
        <Button
          className="logout-btn"
          style={{
            ...brandBtnStyle,
            background: "#064960",
            padding: "6px 16px",
          }}
          onClick={warnBeforeDeleting}
        >
          <FormattedMessage id="header.comp.logout" defaultMessage="Logout" />
          <ExitToAppIcon style={{ marginLeft: "10px" }} />
        </Button>
      </div>
      {modalOpen && expired.length > 0 && (
        <ExpiryInfoModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          products={expired}
        />
      )}
    </div>
  );
}

export default HomePage;
