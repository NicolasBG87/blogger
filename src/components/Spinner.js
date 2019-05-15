import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const SpinnerContext = React.createContext();
export const SpinnerProvider = ({ children }) => {
  const [spinner, setSpinner] = useState(false);

  /**
   * Toggle display of the mask depending
   * on the boolean value passed down to it
   *
   * @param {Boolean} value - if true we show the mask
   */
  const showSpinner = value => {
    setSpinner(value);
  };

  return (
    <SpinnerContext.Provider value={{ showSpinner }}>
      {children}
      <CSSTransition
        in={spinner}
        timeout={300}
        classNames={"Spinner"}
        unmountOnExit
      >
        <div className="Spinner">
          <svg
            width="200px"
            height="200px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className="Spinner__svg"
            style={{ background: "none" }}
          >
            <circle
              cx="50"
              cy="50"
              r="11.6422"
              fill="none"
              stroke="#9895ce"
              strokeWidth="1.5"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;40"
                keyTimes="0;1"
                dur="1"
                keySplines="0 0.2 0.8 1"
                begin="-0.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="1"
                keySplines="0.2 0 0.8 1"
                begin="-0.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx="50"
              cy="50"
              r="31.8971"
              fill="none"
              stroke="#535d93"
              strokeWidth="1.5"
            >
              <animate
                attributeName="r"
                calcMode="spline"
                values="0;40"
                keyTimes="0;1"
                dur="1"
                keySplines="0 0.2 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                calcMode="spline"
                values="1;0"
                keyTimes="0;1"
                dur="1"
                keySplines="0.2 0 0.8 1"
                begin="0s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </CSSTransition>
    </SpinnerContext.Provider>
  );
};
