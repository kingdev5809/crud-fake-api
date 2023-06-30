import React from "react";
import "./PhotoModal.scss";
function PhotoModal({ image, setPhotoModalVisible }) {
  return (
    <>
      <div className="photo-modal">
        <div
          className="close-modal"
          onClick={() => setPhotoModalVisible(false)}
        >
          x
        </div>
        <img src={image} alt="" />
      </div>
      <div
        className="w-screen"
        onClick={() => setPhotoModalVisible(false)}
      ></div>
    </>
  );
}

export default PhotoModal;
