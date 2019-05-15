import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import MaterialIcon from "material-icons-react";

import Logo from "assets/logo.png";
import Login from "components/Login";
import Register from "components/Register";

import { ModalContext } from "components/Modal";
import { AuthContext } from "util/auth";
import { ROUTES } from "util/constants";

const Navigation = ({ toggleMenu }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  /**
   * Open login modal
   */
  const onLogin = () => {
    openModal({ title: "Login", body: <Login closeModal={closeModal} /> });
  };

  /**
   * Log the user out
   */
  const onLogout = () => {
    logout();
  };

  /**
   * Open register modal
   */
  const onRegister = () => {
    openModal({
      title: "Register",
      body: <Register closeModal={closeModal} />
    });
  };

  return (
    <nav className="Navigation">
      <div>
        <MaterialIcon icon="reorder" color="#0e1111" onClick={toggleMenu} />
        <NavLink to={ROUTES.home}>
          <img className="Navigation__logo" src={Logo} alt="Logo" />
        </NavLink>
      </div>
      {isAuthenticated ? (
        <div className="Navigation__actions">
          <button onClick={onLogout}>Logout</button>
          <img src={user.avatar} alt="" className="Navigation__avatar" />
        </div>
      ) : (
        <div className="Navigation__actions">
          <button onClick={onLogin}>Login</button>
          <button onClick={onRegister}>Register</button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
