import React from "react";
import cx from "classnames";
import styles from "./Loader.module.scss";

type Props = {
  color?: "white";
};

const Loader: React.FC<Props> = ({ color }) => {
  return (
    <div className={cx(styles["loader"], color && styles[`${color}`])}></div>
  );
};

export default Loader;
