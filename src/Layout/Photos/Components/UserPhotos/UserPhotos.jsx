import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPhotos } from "../../../../Redux/extraReducers";
import UserPhotoCard from "./Components/UserPhotoCard/UserPhotoCard";
import "./UserPhotos.scss";
import Loader from "../../../../Components/Loader/Loader";
function UserPhotos({ stickyRef }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userPhotos, loading } = useSelector((state) => state.PhotoSlice);
  const [photos, setPhotos] = useState([]);
  console.log(userPhotos);
  useEffect(() => {
    dispatch(getPhotos(id));
  }, []);

  return (
    <div ref={stickyRef} className="userPhotos container">
      {loading ? (
        <Loader />
      ) : (
        userPhotos.map((item) => <UserPhotoCard key={item.id} item={item} />)
      )}
    </div>
  );
}

export default UserPhotos;
