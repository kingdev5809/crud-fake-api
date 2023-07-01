import React, { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "./TodosCard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleCheckedTodo,
  toggleToFavorites,
  updateTodo,
} from "../../../Redux/TodoSlice/TodoSlice";
function TodosCard({ item }) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { favoriteTodoId, checkedTodo } = useSelector(
    (state) => state.TodoSlice
  );
  const [checked, setChecked] = useState(false);
  const [favoritedTodo, setFavoritedTodo] = useState(false);
  const [updateInput, setUpdateInput] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  useEffect(() => {
    if (checkedTodo.length == 0) {
      setChecked(false);
    }
  }, [checkedTodo]);

  useEffect(() => {
    if (favoriteTodoId.includes(item.id)) {
      setFavoritedTodo(true);
    } else {
      setFavoritedTodo(false);
    }
  }, [favoriteTodoId]);

  useEffect(() => {
    if (item.completed === true || updatedTodo?.completed === true) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
    if (updatedTodo?.completed === false) {
      setIsCompleted(false);
    }
  }, [updatedTodo]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(toggleCheckedTodo(item.id));
  };
  const handleFavorites = () => {
    setFavoritedTodo(!favoritedTodo);
    dispatch(toggleToFavorites(item.id));
  };
  // delete todos and set localstorage deleted todos id
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodo(item.id));
    }
  };
  // update todos
  const handleUpdate = () => {
    let updatedTodoId = item.id;
    dispatch(updateTodo({ updatedTodoId, updatedTodo }));
    setUpdateInput(false);
  };
  const handleVisibleUpdateInput = () => {
    setUpdateInput(!updateInput);
    setUpdatedTodo(item);
    inputRef.current.focus();
  };
  return (
    <div>
      <div className={`card ${item.completed ? "completed" : ""}`}>
        <div className="cb-container" onClick={handleCheck}>
          <div className={`check ${checked ? "checked" : ""}`}></div>
        </div>
        <div className={`item ${updateInput ? "nonactive" : ""}`}>
          {item.title}
        </div>

        <div className={`update ${updateInput ? "active" : ""}`}>
          <input
            ref={inputRef}
            type="text"
            value={updatedTodo?.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <div className="completed">
            Completed:
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) =>
                setUpdatedTodo({ ...updatedTodo, completed: e.target.checked })
              }
            />
          </div>
          <button onClick={handleUpdate}>submit</button>
        </div>

        <div className="btn edit" onClick={handleVisibleUpdateInput}>
          <AiFillEdit />
        </div>
        <div className="btn clear">
          <BsTrash onClick={handleDelete} />
        </div>
        <div
          className={`btn favorite ${favoritedTodo ? "liked" : ""}`}
          onClick={handleFavorites}
        >
          {favoritedTodo ? <MdFavorite /> : <MdFavoriteBorder />}
        </div>
      </div>
    </div>
  );
}

export default TodosCard;
