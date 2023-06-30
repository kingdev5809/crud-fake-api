import React from "react";
import "./Filter.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
function Filter({
  handleSeachrOrFilter,
  users,
  favoritePostsVisible,
  filterSearchVisible,
}) {
  return (
    <div className="filters ">
      <h3>Filter by:</h3>
      <div className="filters-inner">
        <button
          className={filterSearchVisible === "name" ? "active" : ""}
          onClick={() => handleSeachrOrFilter(false, "title")}
        >
          Post name
        </button>
        <button
          className={filterSearchVisible === "id" ? "active" : ""}
          onClick={() => handleSeachrOrFilter(false, "title2")}
        >
          Post id
        </button>
        <div className="item">
          <Menu
            menuButton={({ open }) => (
              <MenuButton
                className={open ? "active" : ""}
                onClick={() => handleSeachrOrFilter(false, "user")}
              >
                User name
              </MenuButton>
            )}
          >
            <MenuItem onClick={() => handleSeachrOrFilter("all", "user")}>
              All
            </MenuItem>
            {users.map((user) => (
              <MenuItem
                key={user.id}
                onClick={() => handleSeachrOrFilter(user, "user")}
              >
                <p>{user.name}</p>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <button
          className={`favorite-posts-link ${
            favoritePostsVisible ? "active" : ""
          }`}
          onClick={() => handleSeachrOrFilter(false, "favorites")}
        >
          Favorite posts
        </button>
        {filterSearchVisible ? (
          <div className="search-input">
            <input
              type={filterSearchVisible === "name" ? "text" : "number"}
              placeholder={`Enter post ${filterSearchVisible}`}
              onChange={(e) => handleSeachrOrFilter(e.target.value, "search")}
            />
            <span onClick={() => handleSeachrOrFilter(false, "title")}>
              <AiOutlineClose />
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Filter;
