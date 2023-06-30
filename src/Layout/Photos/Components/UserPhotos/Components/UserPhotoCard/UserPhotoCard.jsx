import React, { useState } from "react";
import "./UserPhotoCard.scss";
import PhotoModal from "../PhotoModal/PhotoModal";
function UserPhotoCard({ item }) {
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  return (
    <>
      <div class="card-item bg-white rounded border">
        <div class="card-img" onClick={() => setPhotoModalVisible(true)}>
          <img src={item.thumbnailUrl} alt="img" />
        </div>
        <div class="card-details">
          <h4 class="title mt-2">{item.title}</h4>
        </div>
      </div>
      {photoModalVisible ? <PhotoModal image={item.url} setPhotoModalVisible={setPhotoModalVisible} /> : ""}
    </>
  );
}

export default UserPhotoCard;
