import React, { useState, useContext } from "react";

import { APIContext } from "util/API";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(undefined);
  const API = useContext(APIContext);

  /**
   * Register the user
   *
   * @param {Object} data - user form data
   * data: {
   *  username: String,
   *  password: String,
   *  avatar: String // image URL
   * }
   */
  const register = data => {
    API.register(data);
  };

  /**
   * Authenticate the user when token is saved in local storage
   *
   * @param {String} token - access token
   */
  const tokenAuth = token => {
    if (token) {
      API.authenticate()
        .then(response => {
          setUser(response.data.data);
          setIsAuthenticated(true);
        })
        .catch(error => {
          logout();
        });
    }
  };

  /**
   * Authenticate the user and add token to the local storage
   *
   * @param {Object} data - user form data
   * data: {
   *  username: String,
   *  password: String
   * }
   * @param {Function} callback - function to be executed after the data has been fetched
   */
  const login = (data, callback) => {
    API.login(data)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.data);
        setIsAuthenticated(true);
        callback();
      })
      .catch(error => {
        logout();
      });
  };

  /**
   * Unauthenticate the user and remove token from local storage
   */
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        tokenAuth,
        isAuthenticated,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
