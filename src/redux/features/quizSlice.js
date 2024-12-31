import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestion: 0,
    singleResult: {},
    resultCurrentQuestionNum: 0,

  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setSingleResult: (state, action) => {
      state.singleResult = action.payload;
    },
    setResultCurrentQuestion: (state, action) => {
      state.resultCurrentQuestionNum = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setQuestions,
  setCurrentQuestion,
  setSingleResult,
  setResultCurrentQuestion
} = quizSlice.actions;

export default quizSlice.reducer;
