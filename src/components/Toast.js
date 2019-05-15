import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

export const ToastContext = React.createContext();
export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});

  /**
   * Hide toast message after 5 seconds
   * will be triggered whenever we show new toast message
   */
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    return () => clearTimeout(toastTimeout);
  }, [toast]);

  /**
   * Display toast and set its content
   *
   * @param {Object} - toast config object
   * config: {
   *  message: String,
   *  error: Boolean // default value is true
   * }
   */
  const openToast = ({ message, error = true }) => {
    if (message) {
      setToast({ message, error });
      setShowToast(true);
    }
  };

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      <CSSTransition
        in={showToast}
        timeout={300}
        classNames={"Toast"}
        unmountOnExit
      >
        <div
          className={`Toast Toast__${toast.error ? "danger" : "info"}`}
          onClick={() => setShowToast(false)}
        >
          {toast.message || ""}
          <span className="Toast__close" onClick={() => setShowToast(false)}>
            ✖
          </span>
        </div>
      </CSSTransition>
    </ToastContext.Provider>
  );
};
