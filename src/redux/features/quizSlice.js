import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestion: 0,

  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setQuestions,
  setCurrentQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
