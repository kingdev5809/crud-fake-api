import { createSlice } from "@reduxjs/toolkit";
import { getAllTodos } from "../extraReducers";

const initialState = {
  loading: false,
  error: "",
  AllTodo: [],
  checkedTodo: [],
  favoriteTodoId: JSON.parse(localStorage.getItem("favoriteTodoId")) || [],
};
const persistedTodo = JSON.parse(localStorage.getItem("todo"));
const Todolice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    updateTodo: (state, action) => {
      const { updatedTodoId, updatedTodo } = action.payload;
      const todoToUpdate = state.AllTodo.find(
        (todo) => todo.id === updatedTodoId
      );

      if (todoToUpdate) {
        // Update the todo with the updatedData
        Object.assign(todoToUpdate, updatedTodo);
      }
    },
    deleteTodo: (state, { payload }) => {
      const filteredTodo = state.AllTodo.filter((todo) => todo.id !== payload);

      state.AllTodo = filteredTodo;
    },
    toggleCheckedTodo: (state, { payload }) => {
      if (payload == "all") {
        state.checkedTodo = [];
        return;
      }
      if (state.checkedTodo.includes(payload)) {
        const filteredTodo = state.checkedTodo.filter((id) => id !== payload);
        return { ...state, checkedTodo: filteredTodo };
      }
      state.checkedTodo.push(payload);
    },
    toggleToFavorites: (state, { payload }) => {
      if (state.favoriteTodoId.includes(payload)) {
        state.favoriteTodoId = state.favoriteTodoId.filter(
          (id) => id !== payload
        );
        localStorage.setItem(
          "favoriteTodoId",
          JSON.stringify(state.favoriteTodoId)
        );
        return;
      }

      state.favoriteTodoId.push(payload);
      localStorage.setItem(
        "favoriteTodoId",
        JSON.stringify(state.favoriteTodoId)
      );
    },

    addTodo: (state, { payload }) => {
      state.AllTodo = [payload, ...state.AllTodo];
    },
    addToCompleted: (state, { payload }) => {
      const todoToUpdate = state.AllTodo.find((todo) => todo.id === payload.id);

      if (todoToUpdate) {
        // Update the todo with the updatedData
        Object.assign(todoToUpdate, payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.loading = false;
      if (persistedTodo?.length > 0) {
        state.AllTodo = persistedTodo;
        return;
      }
      state.AllTodo = action.payload;
    });
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {
  toggleCheckedTodo,
  updateTodo,
  deleteTodo,
  toggleToFavorites,
  addUserToTodo,
  addTodo,
  addToCompleted,
} = Todolice.actions;
export default Todolice.reducer;
