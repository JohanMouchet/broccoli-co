import React from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

type Props = {
  type?: "button" | "submit";
  block?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({
  type = "button",
  block,
  onClick,
  children,
}) => (
  <button
    className={cx(styles["button"], block && styles["block"])}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
