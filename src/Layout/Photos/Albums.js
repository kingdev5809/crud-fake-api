import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums, getAllUsers } from "../../Redux/extraReducers";
import AlbumCard from "./Components/AlbumCard/AlbumCard";
import "./Albums.scss";
import UpdateAlbum from "./Components/UpdateAlbum/UpdateAlbum";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  addUserToAlbums,
  deleteCheckedAlbums,
  deleteAlbums,
  toggleToFavorites,
  updateAlbums,
} from "../../Redux/PhotoSlice/PhotoSlice";
import Filter from "./Components/Filter/Filter";
import Loader from "../../Components/Loader/Loader";
function Albums({ stickyRef }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem("pagination")) || 10
  );
  const [albums, setAlbums] = useState([]);
  const [updatedBody, setUpdatedBody] = useState({
    title: null,
    author: null,
  });
  const [updatedAlbumId, setUpdatedAlbumId] = useState(null);
  const { AllAlbums, users, checkedAlbums, userAddedAlbums, loading } =
    useSelector((state) => state.PhotoSlice);
  const [favoriteAlbumsVisible, setFavoriteAlbumsVisible] = useState(false);
  const [filterSearchVisible, setFilterSearchVisible] = useState(false);
  useEffect(() => {
    dispatch(getAllAlbums());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setAlbums(userAddedAlbums);
  }, [userAddedAlbums]);

  // add user to Albums
  useEffect(() => {
    dispatch(addUserToAlbums());
  }, [AllAlbums, users]);

  // delete Albums and set localstorage deleted Albums id
  const handleDelete = (id, checkbox) => {
    if (checkbox) {
      dispatch(deleteAlbums(id));
      return;
    }
    if (window.confirm("Are you sure?")) {
      dispatch(deleteAlbums(id));
    }
  };

  // update Albums
  const handleUpdate = (updatedBody) => {
    dispatch(updateAlbums({ updatedAlbumId, updatedBody }));
    setUpdatedAlbumId(null);
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
        for (let i = 0; i < checkedAlbums.length; i++) {
          const element = checkedAlbums[i];
          handleDelete(element, true);
        }
      }
    }
    if (type == "favorites") {
      if (window.confirm("Are you sure?")) {
        for (let i = 0; i < checkedAlbums.length; i++) {
          const element = checkedAlbums[i];
          dispatch(toggleToFavorites(element));
        }
      }
    }

    dispatch(deleteCheckedAlbums("all"));
  };

  // filter all Albums
  const handleSeachrOrFilter = (item, type) => {
    if (type === "user") {
      if (item === "all") {
        setAlbums(userAddedAlbums);
        return;
      }
      if (item) {
        const filteredAlbums = userAddedAlbums.filter(
          (Album) => Album.userId === item.id
        );
        setAlbums(filteredAlbums);
      }
      setFavoriteAlbumsVisible(false);
      setFilterSearchVisible(false);
      return;
    }
    if (type === "favorites") {
      if (favoriteAlbumsVisible) {
        setAlbums(userAddedAlbums);
        setFavoriteAlbumsVisible(false);
        return;
      }
      const favoriteAlbumArray = JSON.parse(
        localStorage.getItem("favoriteAlbumsId")
      );
      let filteredArray = albums;

      if (favoriteAlbumArray) {
        filteredArray = userAddedAlbums.filter((element) =>
          favoriteAlbumArray.includes(element.id)
        );
        setAlbums(filteredArray);
        setFavoriteAlbumsVisible(true);
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
      setFavoriteAlbumsVisible(false);
    }

    if (type === "title2") {
      if (filterSearchVisible && filterSearchVisible == "id") {
        setFilterSearchVisible(false);
        return;
      }
      setFilterSearchVisible("id");
      setFavoriteAlbumsVisible(false);
    }
    if (item && type === "search") {
      let filteredData;
      if (filterSearchVisible == "id") {
        filteredData = userAddedAlbums.filter((Album) => Album.id == item);
      } else {
        filteredData = userAddedAlbums.filter((Album) =>
          Album.title.toLowerCase().includes(item.toLowerCase())
        );
      }
      setAlbums(filteredData);
      return;
    }
    setAlbums(userAddedAlbums);
  };

  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    localStorage.setItem("photo", JSON.stringify(userAddedAlbums));
  });
  return (
    <div className="container">
      <div className="top ">
        <div className="flex">
          {" "}
          <h1 className="title" ref={stickyRef}>
            Albums
          </h1>
        </div>
        <div className={`flex ${filterSearchVisible ? "active" : ""}`}>
          <Filter
            handleSeachrOrFilter={handleSeachrOrFilter}
            users={users}
            favoriteAlbumsVisible={favoriteAlbumsVisible}
            filterSearchVisible={filterSearchVisible}
          />
        </div>
      </div>
      {!checkedAlbums.length == 0 ? (
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
      <div className="Albums">
        {loading ? (
          <Loader />
        ) : (
          albums
            ?.slice(0, query)
            ?.map((item) => (
              <AlbumCard
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                setUpdatedAlbumId={setUpdatedAlbumId}
                setUpdatedBody={setUpdatedBody}
              />
            ))
        )}
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
      {updatedAlbumId ? (
        <UpdateAlbum
          handleUpdate={handleUpdate}
          setUpdatedBody={setUpdatedBody}
          updatedBody={updatedBody}
          setUpdatedAlbumId={setUpdatedAlbumId}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Albums;
