import React, { useEffect, useState } from "react";
import "./Todos.scss";
import TodosCard from "./Components/TodosCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from "../../Redux/extraReducers";
import {
  addToCompleted,
  addTodo,
  deleteTodo,
  toggleCheckedTodo,
  toggleToFavorites,
} from "../../Redux/TodoSlice/TodoSlice";
function Todos({ stickyRef }) {
  const dispatch = useDispatch();
  const { AllTodo, checkedTodo, favoriteTodoId } = useSelector(
    (state) => state.TodoSlice
  );
  const date = new Date();
  const [addedTodo, setAddedTodo] = useState({
    id: String(date.getMilliseconds()),
    title: "",
    completed: false,
  });
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState(
    JSON.parse(localStorage.getItem("todo-pagination")) || 10
  );
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  useEffect(() => {
    setTodos(AllTodo);
  }, [AllTodo]);

  // addTodo
  const handleAddTodo = () => {
    dispatch(addTodo(addedTodo));
    setTodos([addedTodo, ...todos]);
    setAddedTodo({
      id: String(date.getMilliseconds()),
      title: "",
      completed: false,
    });
  };
  // set pagination
  const handlePagination = (num) => {
    setQuery(num);
    localStorage.setItem("pagination", JSON.stringify(num));
  };
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    localStorage.setItem("todo", JSON.stringify(AllTodo));
  });

  // chekbox funtion
  const handleCheckedFunction = (type) => {
    if (type == "delete") {
      if (window.confirm("Are you sure delete todo?")) {
        for (let i = 0; i < checkedTodo.length; i++) {
          const element = checkedTodo[i];
          dispatch(deleteTodo(element));
        }
      }
    }
    if (type == "favorites") {
      if (window.confirm("Are you sure update todo?")) {
        for (let i = 0; i < checkedTodo.length; i++) {
          const element = checkedTodo[i];
          dispatch(toggleToFavorites(element));
        }
      }
    }
    if (type == "completed") {
      if (window.confirm("Are you sure add todo complated?")) {
        for (let index = 0; index < todos?.slice(0, query).length; index++) {
          const todo = { ...todos[index], completed: true };
          if (checkedTodo.includes(todo.id)) {
            dispatch(addToCompleted(todo));
          }
        }
      }
    }

    dispatch(toggleCheckedTodo("all"));
  };

  const handleFilterCompleted = (todo) => {
    if (todo == "all") {
      setTodos(AllTodo);
      setActiveFilter("all");
      return;
    }
    if (todo == "completed") {
      const filteredTodos = AllTodo.filter((todo) => todo.completed === true);
      setTodos(filteredTodos);
      setActiveFilter("completed");
      return;
    }
    if (todo == "active") {
      const filteredTodos = AllTodo.filter((todo) => todo.completed === false);
      setTodos(filteredTodos);
      setActiveFilter("active");
      return;
    }
  };

  const handleSearch = (e) => {
    setAddedTodo({ ...addedTodo, title: e.target.value });
    let filteredData = AllTodo.filter((todo) =>
      todo.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTodos(filteredData);
  };
  return (
    <>
      <div ref={stickyRef} className="todos-page ">
        <header className="card">
          <h1>TODO</h1>

          <div
            className={`checkedTodo-btn ${
              !checkedTodo.length == 0 ? "active" : ""
            }`}
          >
            <button onClick={() => handleCheckedFunction("completed")}>
              Add to Completed
            </button>
            <button
              className="favorite"
              onClick={() => handleCheckedFunction("favorites")}
            >
              Add Favorite
            </button>
            <button
              className="delete"
              onClick={() => handleCheckedFunction("delete")}
            >
              Delete
            </button>
          </div>
        </header>
        <div className="main">
          <div className="card add">
            <div className="cb-container">
              <button id="add-btn">+</button>
            </div>
            <div className="txt-container">
              <label htmlFor="addt">Create todo</label>
              <input
                type="text"
                className="txt-input"
                placeholder="Search or Create a new todo "
                spellCheck="false"
                autoComplete="off"
                id="addt"
                value={addedTodo.title}
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={() => handleAddTodo()}
              className={`addbtn ${addedTodo.title ? "active" : ""}`}
            >
              Add todo
            </button>
          </div>
          <ul className="todos ">
            {todos.length == 0 ? <h1 className="item">Todos not found</h1> : ""}
            {todos?.slice(0, query).map((item) => (
              <div key={item.id}>
                {item.completed === false ? (
                  <TodosCard key={item.id} item={item} />
                ) : (
                  ""
                )}
              </div>
            ))}
            {todos?.slice(0, query).map((item) => (
              <div key={item.id}>
                {item.completed === true ? (
                  <TodosCard key={item.id} item={item} />
                ) : (
                  ""
                )}
              </div>
            ))}
          </ul>
          <div className="card stat">
            <div className="filter">
              <button
                id="all"
                className={activeFilter === "all" ? "on" : ""}
                onClick={() => handleFilterCompleted("all")}
              >
                All
              </button>
              <button
                className={activeFilter === "active" ? "on" : ""}
                id="active"
                onClick={() => handleFilterCompleted("active")}
              >
                Active
              </button>
              <button
                className={activeFilter === "completed" ? "on" : ""}
                id="completed"
                onClick={() => handleFilterCompleted("completed")}
              >
                Completed
              </button>
            </div>
            <div className="todo-pagination">
              <div
                className={`todo-pagination-item ${
                  query === 10 ? "active" : ""
                }`}
                onClick={() => handlePagination(10)}
              >
                10
              </div>
              <div
                onClick={() => handlePagination(20)}
                className={`todo-pagination-item ${
                  query === 20 ? "active" : ""
                }`}
              >
                20
              </div>
              <div
                onClick={() => handlePagination(50)}
                className={`todo-pagination-item ${
                  query === 50 ? "active" : ""
                }`}
              >
                50
              </div>
              <div
                onClick={() => handlePagination(100)}
                className={`todo-pagination-item ${
                  query === 100 ? "active" : ""
                }`}
              >
                100
              </div>
              <div
                onClick={() => handlePagination(1000)}
                className={`todo-pagination-item ${
                  query === 1000 ? "active" : ""
                }`}
              >
                All
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;
