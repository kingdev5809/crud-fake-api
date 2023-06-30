import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Comments from "../Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCheckedPosts,
  putCheckedPosts,
  toggleToFavorites,
} from "../../../../Redux/PostSlice/PostSlice";
function PostCard({ item, handleDelete, setUpdatedPostId, setUpdatedBody }) {
  const dispatch = useDispatch();
  const { favoritePostsId, checkedPosts } = useSelector(
    (state) => state.PostSlice
  );
  const [favorite, setFavorite] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleSetUpdatedPost = (item) => {
    setUpdatedPostId(item.id);
    setUpdatedBody(item);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);

    if (!event.target.checked) {
      dispatch(deleteCheckedPosts(item.id));
      return;
    }
    dispatch(putCheckedPosts(item.id));
  };
  useEffect(() => {
    if (checkedPosts == 0) {
      setIsChecked(false);
    }
  }, [checkedPosts]);

  useEffect(() => {
    if (favoritePostsId.includes(item.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoritePostsId]);

  const handleAddFavorite = () => {
    dispatch(toggleToFavorites(item.id));
  };

  // set overflow hidden when modal active
  useEffect(() => {
    if (commentsVisible) {
      document.body.classList.add("modal-open2");
    } else {
      document.body.classList.remove("modal-open2");
    }
  }, [commentsVisible]);
  return (
    <>
      <div className="card">
        <div className="favorite" onClick={handleAddFavorite}>
          {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
        </div>
        <h1 className="post_title">{item.title}</h1>
        <p className="post_body">{item.body}</p>
        <div className="author">
          <span>
            <h1>{item?.author}</h1>
          </span>
        </div>
        <div className="chekbox">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="edit-delete">
          <p className="edit" onClick={() => handleSetUpdatedPost(item)}>
            <span>
              <AiFillEdit />
            </span>
            edit
          </p>
          <p className="delete" onClick={() => handleDelete(item.id)}>
            <span>
              <BsTrash />
            </span>
            delete
          </p>
        </div>
        <h4 className="open-comments" onClick={() => setCommentsVisible(true)}>
          Open Comments
        </h4>
      </div>
      {commentsVisible ? (
        <Comments item={item} setCommentsVisible={setCommentsVisible} />
      ) : (
        ""
      )}
    </>
  );
}

export default PostCard;
