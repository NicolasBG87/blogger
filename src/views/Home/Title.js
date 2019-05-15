import React, { useContext } from "react";

import { DATE } from "util/formatter";
import { AuthContext } from "util/auth";

const Title = ({ onCreate }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <h1 className="Home__title">
      <div>
        <span>Latest Posts</span>
        <sub>{DATE.format(Date.now())}</sub>
      </div>
      {isAuthenticated && <button onClick={onCreate}>Create</button>}
    </h1>
  );
};

export default Title;
