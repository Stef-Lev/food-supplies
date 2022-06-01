import React from "react";
import { homeTilesData, tileColorsArray } from "../../utils/homeTilesData";
import HomeTile from "../../components/HomeTile/HomeTile";
import { FormattedMessage } from "react-intl";
import styles from "./HomePage.module.css";

function HomePage() {
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
            label={item.label}
            icon={item.icon}
            href={item.href}
            color={tileColorsArray[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
