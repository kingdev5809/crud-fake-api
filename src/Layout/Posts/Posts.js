import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "../../Redux/extraReducers";
import PostCard from "./Components/PostCard/PostCard";
import "./Posts.scss";
import UpdatePost from "./Components/UpdatePost/UpdatePost";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  addPost,
  addUserToPosts,
  deleteCheckedPosts,
  deletePost,
  toggleToFavorites,
  updatePost,
} from "../../Redux/PostSlice/PostSlice";
import Filter from "./Components/Filter/Filter";
import AddPost from "./Components/AddPost/AddPost";
import Loader from "../../Components/Loader/Loader";
function Posts({ stickyRef }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem("pagination")) || 10
  );
  const [posts, setPosts] = useState([]);
  const [updatedBody, setUpdatedBody] = useState({
    body: null,
    title: null,
    author: null,
  });
  const [updatedPostId, setUpdatedPostId] = useState(null);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const { AllPosts, users, checkedPosts, userAddedPosts, loading } =
    useSelector((state) => state.PostSlice);
  const [favoritePostsVisible, setFavoritePostsVisible] = useState(false);
  const [filterSearchVisible, setFilterSearchVisible] = useState(false);
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setPosts(userAddedPosts);
  }, [userAddedPosts]);

  // add user to posts
  useEffect(() => {
    dispatch(addUserToPosts());
  }, [AllPosts, users]);

  // delete posts and set localstorage deleted posts id
  const handleDelete = (id, checkbox) => {
    if (checkbox) {
      dispatch(deletePost(id));
      return;
    }
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost(id));
    }
  };

  // update posts
  const handleUpdate = (updatedBody) => {
    dispatch(updatePost({ updatedPostId, updatedBody }));
    setUpdatedPostId(null);
  };

  const handleAddPost = (item) => {
    dispatch(addPost(item));
    setPosts([item, ...posts]);
    setAddPostModalVisible(false);
  };

  // set pagination
  const handlePagination = (num) => {
    setQuery(num);
    localStorage.setItem("pagination", JSON.stringify(num));
  };

  // chekbox funtion
  const handleCheckedFunction = (type) => {
    if (type == "delete") {
      if (window.confirm("Are you sure?")) {
        for (let i = 0; i < checkedPosts.length; i++) {
          const element = checkedPosts[i];
          handleDelete(element, true);
        }
      }
    }
    if (type == "favorites") {
      if (window.confirm("Are you sure?")) {
        for (let i = 0; i < checkedPosts.length; i++) {
          const element = checkedPosts[i];
          dispatch(toggleToFavorites(element));
        }
      }
    }

    dispatch(deleteCheckedPosts("all"));
  };

  // filter all posts
  const handleSeachrOrFilter = (item, type) => {
    if (type === "user") {
      if (item === "all") {
        setPosts(userAddedPosts);
        return;
      }
      if (item) {
        const filteredPosts = userAddedPosts.filter(
          (post) => post.userId === item.id
        );
        setPosts(filteredPosts);
      }
      setFavoritePostsVisible(false);
      setFilterSearchVisible(false);
      return;
    }
    if (type === "favorites") {
      if (favoritePostsVisible) {
        setPosts(userAddedPosts);
        setFavoritePostsVisible(false);
        return;
      }
      const favoritePostArray = JSON.parse(
        localStorage.getItem("favoritePostsId")
      );
      let filteredArray = posts;

      if (favoritePostArray) {
        filteredArray = userAddedPosts.filter((element) =>
          favoritePostArray.includes(element.id)
        );
        setPosts(filteredArray);
        setFavoritePostsVisible(true);
      }
      setFilterSearchVisible(false);
      return;
    }

    if (type === "title") {
      if (filterSearchVisible && filterSearchVisible == "name") {
        setFilterSearchVisible(false);
        return;
      }

      setFilterSearchVisible("name");
      setFavoritePostsVisible(false);
    }

    if (type === "title2") {
      if (filterSearchVisible && filterSearchVisible == "id") {
        setFilterSearchVisible(false);
        return;
      }
      setFilterSearchVisible("id");
      setFavoritePostsVisible(false);
    }
    if (item && type === "search") {
      let filteredData;
      if (filterSearchVisible == "id") {
        filteredData = userAddedPosts.filter((post) => post.id == item);
      } else {
        filteredData = userAddedPosts.filter((post) =>
          post.title.toLowerCase().includes(item.toLowerCase())
        );
      }
      setPosts(filteredData);
      return;
    }
    setPosts(userAddedPosts);
  };

  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    localStorage.setItem("post", JSON.stringify(userAddedPosts));
  });
  return (
    <div className="container">
      <div className="top ">
        <div className="flex">
          {" "}
          <h1 className="title" ref={stickyRef}>
            Posts
          </h1>
          <div className="add-post">
            <button onClick={() => setAddPostModalVisible(true)}>
              Add Post
            </button>
          </div>
        </div>
        <div className={`flex ${filterSearchVisible ? "active" : ""}`}>
          <Filter
            handleSeachrOrFilter={handleSeachrOrFilter}
            users={users}
            favoritePostsVisible={favoritePostsVisible}
            filterSearchVisible={filterSearchVisible}
          />
        </div>
      </div>
      {!checkedPosts.length == 0 ? (
        <div className="edit-delete-btn">
          <button
            className="edit"
            onClick={() => handleCheckedFunction("favorites")}
          >
            Add to favorites
          </button>
          <button
            className="delete"
            onClick={() => handleCheckedFunction("delete")}
          >
            Delete
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="posts">
        {posts?.slice(0, query)?.map((item) => (
          <PostCard
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            setUpdatedPostId={setUpdatedPostId}
            setUpdatedBody={setUpdatedBody}
          />
        ))}
      </div>
      <div className="pagination">
        <div
          className={`pagination-item ${query === 10 ? "active" : ""}`}
          onClick={() => handlePagination(10)}
        >
          10
        </div>
        <div
          onClick={() => handlePagination(20)}
          className={`pagination-item ${query === 20 ? "active" : ""}`}
        >
          20
        </div>
        <div
          onClick={() => handlePagination(50)}
          className={`pagination-item ${query === 50 ? "active" : ""}`}
        >
          50
        </div>
        <div
          onClick={() => handlePagination(100)}
          className={`pagination-item ${query === 100 ? "active" : ""}`}
        >
          100
        </div>
        <div
          onClick={() => handlePagination(1000)}
          className={`pagination-item ${query === 1000 ? "active" : ""}`}
        >
          All
        </div>
      </div>
      {updatedPostId ? (
        <UpdatePost
          handleUpdate={handleUpdate}
          setUpdatedBody={setUpdatedBody}
          updatedBody={updatedBody}
          setUpdatedPostId={setUpdatedPostId}
        />
      ) : (
        ""
      )}
      {addPostModalVisible ? (
        <AddPost
          setAddPostModalVisible={setAddPostModalVisible}
          handleAddPost={handleAddPost}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
