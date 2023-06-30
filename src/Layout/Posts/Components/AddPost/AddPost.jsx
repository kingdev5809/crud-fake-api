import React, { useState } from "react";
import "./AddPost.scss";
function AddPost({ handleAddPost, setAddPostModalVisible }) {
  const date = new Date();
  const [addedPost, setAddedPost] = useState({
    id: String(date.getMilliseconds()),
  });
  return (
    <>
      <div className="addPost">
        <div className="addPost_inner">
          <div
            className="close-modal"
            onClick={() => setAddPostModalVisible(null)}
          >
            x
          </div>
          <div className="submitBox">
            <div className="inputs">
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={addedPost.author}
                  onChange={(e) =>
                    setAddedPost({ ...addedPost, author: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Enter post authot name
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={addedPost.title}
                  onChange={(e) =>
                    setAddedPost({ ...addedPost, title: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Enter post title
                </label>
              </div>

              <div className="form__group field">
                <textarea
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={addedPost.body}
                  rows={10}
                  onChange={(e) =>
                    setAddedPost({ ...addedPost, body: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Enter post content
                </label>
              </div>
            </div>
            <button className="button" onClick={() => handleAddPost(addedPost)}>
              <span className="text">Submit</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-screen"
        onClick={() => setAddPostModalVisible(null)}
      ></div>
    </>
  );
}

export default AddPost;
