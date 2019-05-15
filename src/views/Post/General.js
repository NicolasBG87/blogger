import React from "react";

import { DATE } from "util/formatter";

const General = ({ post }) => {
  const { featured_image, title, tagline, category } = post;
  return (
    <>
      <div
        className="Post__featured-image"
        style={{
          backgroundImage: `url(${featured_image})`,
          backgroundPosition: "center center"
        }}
      />
      <h1 className="Post__title">{title}</h1>
      <p className="Post__tagline">
        {tagline.split(" ").map(tag => `#${tag} `)}
      </p>
      <p className="Post__category">Category: {category}</p>
      <p className="Post__time-ago">{DATE.timeAgo(post.date)}</p>
    </>
  );
};

export default General;
