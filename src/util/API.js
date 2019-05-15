import React, { useContext } from "react";
import axios from "axios";

import { SpinnerContext } from "components/Spinner";
import { ToastContext } from "components/Toast";
import { BASE_URL, REQUEST_TIMEOUT } from "./constants";

export const APIContext = React.createContext();
export const APIProvider = ({ children }) => {
  const { showSpinner } = useContext(SpinnerContext);
  const { openToast } = useContext(ToastContext);

  // set default axios configuration
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.timeout = REQUEST_TIMEOUT;

  /**
   * Intercept axios request and response
   *
   * @request
   *  • Attach token to each request (if available)
   *  • Show spinner on each request
   *  • Hide spinner on error
   *  • Show toast message on error
   *
   * @response
   *  • Hide spinner when data is fetched
   *  • Hide spinner on error
   *  • Show toast message on error
   */
  axios.interceptors.request.use(
    config => {
      const hasToken = localStorage.getItem("token");
      if (hasToken) {
        config.headers["Authorization"] = hasToken;
      }
      showSpinner(true);
      return config;
    },
    error => {
      showSpinner(false);
      openToast({ message: error.response.data.message });
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    response => {
      showSpinner(false);
      openToast({ message: response.data.message, error: false });
      return response;
    },
    error => {
      showSpinner(false);
      openToast({ message: error.response.data.message });
      return Promise.reject(error);
    }
  );

  // API calls - public methods
  const login = data => axios.post("/users/login", data);
  const register = data => axios.post("/users/register", data);
  const authenticate = () => axios.post("/users/authenticate");
  const create_post = data => axios.post("/posts/create", data);
  const search_posts = data => axios.post("/posts/search", data);
  const get_posts = data => axios.post("/posts/all", data);
  const get_post = data => axios.post("/posts/one", data);
  const like_post = data => axios.post("/posts/like", data);
  const comment_post = data => axios.post("/posts/comment", data);

  return (
    <APIContext.Provider
      value={{
        register,
        login,
        authenticate,
        create_post,
        search_posts,
        get_posts,
        get_post,
        like_post,
        comment_post
      }}
    >
      {children}
    </APIContext.Provider>
  );
};
