import React, { useContext } from "react";
import MaterialIcon from "material-icons-react";

import { APIContext } from "util/API";

const Action = ({ post, setPost }) => {
  const { _id, likes } = post;
  const { like_post } = useContext(APIContext);

  const likePost = _id => {
    like_post({ _id }).then(response => setPost(response.data.data));
  };

  return (
    <div className="Post__action" onClick={() => likePost(_id)}>
      <MaterialIcon icon="thumb_up" color="#fafaf2" size={20} />
      <span className="Post__action--badge">{likes > 99 ? "99+" : likes}</span>
    </div>
  );
};

export default Action;
