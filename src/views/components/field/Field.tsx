import React from "react";
import styles from "./Field.module.scss";

type FieldProps = {
  label?: string;
  type?: "text" | "email";
  name: string | undefined;
  children?: React.ReactNode;
  attributes?: Record<string, unknown>;
};

const Field: React.FC<FieldProps> = ({
  label,
  type = "text",
  name,
  children,
  attributes,
}) => (
  <label className={styles["label"]}>
    {label}
    <input
      type={type}
      name={name}
      className={styles["field"]}
      {...attributes}
    />
    {children && <span className={styles["validation"]}>{children}</span>}
  </label>
);

export default Field;
