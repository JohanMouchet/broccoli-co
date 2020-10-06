import React from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { STATIC } from "constants/static";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles["header"]}>
      <span className={styles["logo"]}>
        <span className={styles["logo-icon"]}>
          <Logo />
        </span>
        <h2 className={styles["logo-text"]}>{STATIC.company.name}</h2>
      </span>
    </header>
  );
};

export default Header;
