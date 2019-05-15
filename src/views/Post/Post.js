import React, { useEffect, useState, useContext } from "react";
import useReactRouter from "use-react-router";

import Author from "views/Post/Author";
import General from "views/Post/General";
import Content from "views/Post/Content";
import Action from "views/Post/Action";
import CommentForm from "views/Post/CommentForm";
import Comments from "views/Post/Comments";

import { APIContext } from "util/API";

const Post = () => {
  const { location } = useReactRouter();
  const [post, setPost] = useState(undefined);
  const { get_post } = useContext(APIContext);

  /**
   * Load post on mount
   */
  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    const _id = location.hash.substr(1);
    get_post({ _id }).then(response => setPost(response.data.data));
  };

  return (
    <>
      {post && (
        <div className="Post">
          <Author author={post.author} />
          <General post={post} />
          <Content post={post} />
          <Action post={post} setPost={setPost} />
          <CommentForm post={post} setPost={setPost} />
          <Comments comments={post.comments} />
        </div>
      )}
    </>
  );
};

export default Post;
