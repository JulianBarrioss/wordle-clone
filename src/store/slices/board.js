import { createSlice } from "@reduxjs/toolkit";
import { defaultValue } from "../../defaultValue";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boardState: defaultValue,
    currentAttempt: { attempt: 0, letterPosition: 0 },
    correctWord: "",
    wordsSet: [],
    disabledKeys: [],
    gameFinished: { gameOver: false, guessedWord: false },
  },
  reducers: {
    changeBoard: (state, action) => {
      state.boardState = action.payload;
    },
    nextLetter: (state) => {
      state.currentAttempt = {
        ...state.currentAttempt,
        letterPosition: state.currentAttempt.letterPosition + 1,
      };
    },
    prevLetter: (state) => {
      state.currentAttempt = {
        ...state.currentAttempt,
        letterPosition: state.currentAttempt.letterPosition - 1,
      };
    },
    nextRow: (state) => {
      state.currentAttempt = {
        letterPosition: 0,
        attempt: state.currentAttempt.attempt + 1,
      };
    },
    setCorrectWord: (state, action) => {
      state.correctWord = action.payload;
    },
    setWordsSet: (state, action) => {
      state.wordsSet = action.payload;
    },
    setDisabledKeys: (state, action) => {
      state.disabledKeys = [...state.disabledKeys, action.payload];
    },
    setGameFinished: (state, action) => {
      state.gameFinished = { gameOver: true, guessedWord: action.payload };
    },
  },
});

export const {
  changeBoard,
  nextLetter,
  nextRow,
  prevLetter,
  setCorrectWord,
  setWordsSet,
  setDisabledKeys,
  setGameFinished,
} = boardSlice.actions;

export default boardSlice.reducer;
