import React, { useEffect, useState, useContext } from "react";
import useReactRouter from "use-react-router";

import CreatePost from "components/CreatePost";
import PostItem from "views/Home/PostItem";
import Title from "views/Home/Title";

import { APIContext } from "util/API";
import { ModalContext } from "components/Modal";

const Home = () => {
  const { location } = useReactRouter();
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(undefined);
  const { openModal, closeModal } = useContext(ModalContext);
  const { get_posts } = useContext(APIContext);

  /**
   * Load latests posts initially
   */
  useEffect(() => {
    getPosts();
  }, [location.key]);

  /**
   * Refresh posts lists and close modal on new post creation
   */
  const onModalClose = () => {
    getPosts();
    closeModal();
  };

  /**
   * Get latests 10 posts skipping the ones
   * that are already loaded
   * e.g. pagination
   *
   * @param {Boolean} shouldAdd - should posts be overriden or added
   */
  const getPosts = shouldAdd => {
    const category = location.hash.substr(1) || undefined;
    let skip = 0;
    if (shouldAdd) {
      skip = posts.length;
      get_posts({ skip }).then(response => {
        const updatedPosts = [...posts, ...response.data.data];
        setPosts(updatedPosts);
        setCount(response.data.count);
      });
    } else {
      get_posts({ skip, category })
        .then(response => {
          setPosts(response.data.data);
          setCount(response.data.count);
        })
        .catch(err => {
          setPosts([]);
          setCount(undefined);
        });
    }
  };

  /**
   * Open create post modal
   */
  const onCreate = () => {
    openModal({
      title: "Create Post",
      body: <CreatePost closeModal={onModalClose} />
    });
  };

  return (
    <div className="Home">
      <Title onCreate={onCreate} />
      {posts.length ? (
        posts.map((post, index) => <PostItem post={post} key={index} />)
      ) : (
        <p>No posts matching the query</p>
      )}
      {count && posts.length && count !== posts.length ? (
        <button onClick={() => getPosts(true)}>Load More</button>
      ) : null}
    </div>
  );
};

export default Home;
