import React from "react";
import cx from "classnames";
import { Footer, Header, Main } from "views/partials";
import styles from "./FullHeight.module.scss";

type Props = {
  children: React.ReactNode;
};

const FullHeight: React.FC<Props> = ({ children }) => (
  <div className={styles["layout"]}>
    <div className={cx(styles["container"], "container container--xl")}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  </div>
);

export default FullHeight;
