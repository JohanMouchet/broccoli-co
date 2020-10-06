import React from "react";
import { STATIC } from "constants/static";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <span className={styles["copy"]}>
        Made with &#9825; in {STATIC.company.location}. Developed by{" "}
        <a href="https://www.johan-mouchet.com/">Johan Mouchet</a>.
      </span>
      <i className={styles["copy"]}>
        &copy; {new Date().getFullYear()} {STATIC.company.name} All rights
        reserved.
      </i>
    </footer>
  );
};

export default Footer;
