import { createSlice } from "@reduxjs/toolkit";

const managementSlice = createSlice({
  name: "management",
  initialState: {
    task: [],
  },
  reducers: {
    addTask: (state, action) => {
      console.log("action: ", action);
      state.task.push(action.payload);
    },
    editTask: (state, action) => {
      console.log("action.payload: ", action.payload);
      const { id, data } = action.payload;
      const index = state.task.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.task[index] = { ...data, id };
      }
    },
    deleteTask: (state, action) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, editTask, deleteTask } = managementSlice.actions;
export default managementSlice.reducer;
