import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestion: 0,
    review: [],
    answered: [],
    selectedOption: null,
    finished: false,
    timeLeft: 60,

  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    setReviewed: (state, action) => {
      state.review = action.payload;
    },
    setAnswered: (state, action) => {
      state.answered = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setQuestions,
  setCurrentQuestion,
  setSelectedOption,
  setReviewed,
  setAnswered
} = quizSlice.actions;

export default quizSlice.reducer;
