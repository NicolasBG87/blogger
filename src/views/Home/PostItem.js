import React from "react";
import { Link } from "react-router-dom";

import { DATE } from "util/formatter";

const PostItem = ({ post }) => {
  return (
    <div className="Home__post">
      <div
        className="Home__post--image"
        style={{
          backgroundImage: `url(${post.featured_image})`,
          backgroundPosition: "center center"
        }}
      />
      <h1 className="Home__post--title">{post.title}</h1>
      <p className="Home__post--tagline">
        {post.tagline.split(" ").map(tag => `#${tag} `)}
      </p>
      <p className="Home__post--author">
        <sub>Author:</sub> <span>@{post.author}</span>
      </p>
      <p className="Home__post--time-ago">{DATE.timeAgo(post.date)}</p>
      <div className="Home__post--footer">
        <div>
          <p className="Home__post--likes">{post.likes} like(s)</p>
          <p className="Home__post--views">{post.views} view(s)</p>
          <p className="Home__post--comments">
            {post.comments.length} comment(s)
          </p>
        </div>
        <Link to={`/blogger/post#${post._id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
