import React from "react";
import { useState } from "react";
import { ReactComponent as IconCheckCircle } from "assets/images/check-circle.svg";
import { ReactComponent as IconExclamationCircle } from "assets/images/exclamation-circle.svg";
import { ReactComponent as IconExclamationTriangle } from "assets/images/exclamation-triangle.svg";
import { ReactComponent as IconX } from "assets/images/x.svg";
import cx from "classnames";
import styles from "./Alert.module.scss";

type Props = {
  isOpen?: boolean;
  closable?: boolean;
  variant?: "success" | "warning" | "danger";
  position?: "fixed-bottom" | "fixed-bottom-right";
  children: React.ReactNode;
};

const Alert: React.FC<Props> = ({
  isOpen = true,
  closable,
  variant = "success",
  position,
  children,
}) => {
  const [open, setOpenState] = useState(isOpen);

  const getIcon = (variant: string) => {
    if (variant === "success") {
      return <IconCheckCircle />;
    } else if (variant === "warning") {
      return <IconExclamationTriangle />;
    } else if (variant === "danger") {
      return <IconExclamationCircle />;
    }
  };

  return !open ? null : (
    <div
      className={cx(
        styles["alert"],
        closable && styles["closable"],
        variant && styles[`${variant}`],
        position && styles[`${position}`],
        "container"
      )}
    >
      <div className={styles["grid"]}>
        <div
          className={cx(styles["icon"], styles["cell"])}
          aria-label={variant}
        >
          {getIcon(variant)}
        </div>
        <div
          className={cx(styles["content"], styles["cell"], styles["cell-grow"])}
        >
          {children}
        </div>
        {closable && (
          <div className={cx(styles["close"], styles["cell"])}>
            <button
              className={styles["close-button"]}
              aria-label="Close"
              onClick={() => setOpenState(!open)}
              type="button"
            >
              <IconX />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
