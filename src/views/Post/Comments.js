import React from "react";

import { DATE } from "util/formatter";

const Comments = ({ comments }) => {
  return (
    <div className="Post__comments">
      {comments.length ? (
        comments.map((comment, index) => {
          return (
            <div className="Comment" key={index}>
              <p className="Comment__author">
                <span>{comment.username}</span>{" "}
                <sub>{DATE.timeAgo(comment.date)}</sub>
              </p>
              <p className="Comment__content">{comment.content}</p>
            </div>
          );
        })
      ) : (
        <p>No comments for this post</p>
      )}
    </div>
  );
};

export default Comments;
