import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { AuthContext } from "util/auth";
import { ROUTES } from "util/constants";
import Navigation from "components/Navigation";
import Sidebar from "components/Sidebar";
import Home from "views/Home/Home";
import Post from "views/Post/Post";

const App = () => {
  const { tokenAuth, isAuthenticated } = useContext(AuthContext);
  const [menu, setMenu] = useState(undefined);

  useEffect(() => {
    const width = window.innerWidth;
    width < 1050 ? setMenu(false) : setMenu(true);
    window.addEventListener("resize", updateViewport);
  }, []);

  const updateViewport = e => {
    const width = e.target.innerWidth;
    width < 1050 ? setMenu(false) : setMenu(true);
  };

  /**
   * Initial authentication
   * If there is a token in local storage authenticate the user
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      tokenAuth(token);
    }
  }, []);

  const toggleMenu = () => {
    setMenu(prevState => !prevState);
  };

  const closeMenu = () => {
    const width = window.innerWidth;
    width < 1050 && setMenu(false);
  };

  return (
    <Router>
      <Navigation toggleMenu={toggleMenu} />
      {menu ? <Sidebar closeMenu={closeMenu} /> : null}
      <Switch>
        <Route path={ROUTES.post} exact component={Post} />
        <Route path={ROUTES.posts} exact component={Home} />
        <Route render={() => <Redirect to={ROUTES.posts} />} />
      </Switch>
    </Router>
  );
};

export default App;
