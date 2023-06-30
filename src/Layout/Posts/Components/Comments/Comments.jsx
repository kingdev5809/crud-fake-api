import React, { useEffect } from "react";
import "./Comments.scss";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../../../Redux/extraReducers";
function Comments({ item, setCommentsVisible }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.PostSlice);

  useEffect(() => {
    dispatch(getComments(item.id));
  }, [item]);

  return (
    <>
      <div className="comments">
        <div className="comments-inner">
          <div
            className="close-modal"
            onClick={() => setCommentsVisible(false)}
          >
            x
          </div>
          {comments.map((comment) => (
            <div className="comment__item comment__item--sub" key={comment.id}>
              <div className="flex">
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                  alt="avatar"
                  className="comment__item__avatar"
                />
                <div className="flex-grow">
                  <h3 className="comment__item__title">{item.author}</h3>
                  <h4 className="comment__item__subtitle">{comment.email}</h4>
                </div>
              </div>
              <p className="comment__item__content">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen" onClick={() => setCommentsVisible(false)}></div>
    </>
  );
}

export default Comments;
