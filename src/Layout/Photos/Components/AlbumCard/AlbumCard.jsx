import React, { useEffect, useState } from "react";
import "./AlbumCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  deleteCheckedAlbums,
  putCheckedAlbums,
  toggleToFavorites,
} from "../../../../Redux/PhotoSlice/PhotoSlice";
import { Link } from "react-router-dom";
function AlbumCard({ item, handleDelete, setUpdatedPostId, setUpdatedBody }) {
  const dispatch = useDispatch();
  const { favoriteAlbumsId, checkedPosts } = useSelector(
    (state) => state.PhotoSlice
  );
  const [favorite, setFavorite] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleSetUpdatedPost = (item) => {
    setUpdatedPostId(item.id);
    setUpdatedBody(item);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);

    if (!event.target.checked) {
      dispatch(deleteCheckedAlbums(item.id));
      return;
    }
    dispatch(putCheckedAlbums(item.id));
  };
  useEffect(() => {
    if (checkedPosts == 0) {
      setIsChecked(false);
    }
  }, [checkedPosts]);

  useEffect(() => {
    if (favoriteAlbumsId.includes(item.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoriteAlbumsId]);

  const handleAddFavorite = () => {
    dispatch(toggleToFavorites(item.id));
  };

  return (
    <div className="album-card">
      <div className="favorite" onClick={handleAddFavorite}>
        {favorite ? <MdFavorite /> : <MdFavoriteBorder />}
      </div>
      <Link to={`/albums/user-photos/${item.id}`}>
        <div className="title">{item.title}</div>
      </Link>
      <div className="author">{item.author}</div>
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
    </div>
  );
}

export default AlbumCard;
