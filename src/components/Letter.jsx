import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDisabledKeys } from "../store/slices/board";

const Letter = ({ attempt, letterPosition }) => {
  const dispatch = useDispatch();
  const { boardState, correctWord, currentAttempt } = useSelector(
    (state) => state.board
  );
  const letter = boardState[attempt][letterPosition];

  const correct = correctWord[letterPosition] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState =
    currentAttempt.attempt > attempt &&
    (correct ? "correct" : almost ? "almost" : "wrong");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      dispatch(setDisabledKeys(letter));
    }
  }, [currentAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export { Letter };
