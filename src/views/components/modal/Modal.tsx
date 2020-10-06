import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as IconX } from "assets/images/x.svg";
import cx from "classnames";
import FocusTrap from "focus-trap-react";
import { Button } from "views/components";
import styles from "./Modal.module.scss";

type Props = {
  isOpen?: boolean;
  triggerLabel: React.ReactNode;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, triggerLabel, children }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleScrollLock = () =>
    document.querySelector("html")?.classList.toggle("scroll-lock");

  const openModal = () => {
    setOpen(true);
    toggleScrollLock();
  };

  const closeModal = () => {
    setOpen(false);
    toggleScrollLock();
  };

  const handleEscKey = (event: React.KeyboardEvent) =>
    event.keyCode === 27 && closeModal();

  const handleOutsideClick = (event: React.MouseEvent) =>
    event.target === event.currentTarget && closeModal();

  return (
    <>
      <Button onClick={openModal}>{triggerLabel}</Button>

      {!open
        ? null
        : createPortal(
            <FocusTrap>
              <div
                className={cx(styles["modal"], "animation animation--fade-in")}
                role="dialog"
                tabIndex={-1}
                aria-modal="true"
                onClick={handleOutsideClick}
                onKeyDown={handleEscKey}
              >
                <div
                  className={cx(styles["dialog"], "container container--sm")}
                >
                  <button
                    className={styles["close-button"]}
                    onClick={closeModal}
                    aria-label="Close Modal"
                  >
                    <IconX />
                  </button>
                  {children}
                </div>
              </div>
            </FocusTrap>,
            document.body
          )}
    </>
  );
};

export default Modal;
