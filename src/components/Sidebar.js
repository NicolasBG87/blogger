import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Autocomplete from "components/Form/Autocomplete";
import { CATEGORIES } from "util/constants";
import { APIContext } from "util/API";

const Sidebar = ({ closeMenu }) => {
  const { search_posts } = useContext(APIContext);

  return (
    <aside className="Sidebar">
      <Autocomplete callback={search_posts} closeMenu={closeMenu} />
      {CATEGORIES.map((category, index) => (
        <NavLink
          to={`/blogger/posts#${category}`}
          className="Sidebar__item"
          key={index}
          onClick={closeMenu}
        >
          {category}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
