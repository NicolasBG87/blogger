import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

export const ModalContext = React.createContext();
export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState({});

  /**
   * Open the modal and set its content
   * config: {
   *  title: String,
   *  body: Mixed => can be any valid html element or React component
   * }
   *
   * @param {Object} config - object containing modal config
   */
  const openModal = config => {
    setContent(config);
    setShowModal(true);
  };

  /**
   * Close the modal
   */
  const closeModal = () => setShowModal(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames={"Modal"}
        unmountOnExit
      >
        <div className="Modal">
          <div className="Modal__content">
            <div className="Modal__title">{content.title}</div>
            <div className="Modal__body">{content.body}</div>
            <span className="Modal__close" onClick={() => setShowModal(false)}>
              ✖
            </span>
          </div>
        </div>
      </CSSTransition>
    </ModalContext.Provider>
  );
};
