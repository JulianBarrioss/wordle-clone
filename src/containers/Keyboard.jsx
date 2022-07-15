import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeBoard,
  nextLetter,
  nextRow,
  prevLetter,
  setGameFinished,
} from "../store/slices/board";
import { Key } from "../components/Key";

const Keyboard = () => {
  const lineOneKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const lineTwoKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const lineThreeKeys = ["Z", "X", "C", "V", "B", "N", "M"];

  const { boardState, currentAttempt, wordsSet, correctWord, disabledKeys } =
    useSelector((state) => state.board);
  const { attempt, letterPosition } = currentAttempt;
  const dispatch = useDispatch();

  const onEnter = () => {
    if (letterPosition !== 5 || attempt > 6) return;
    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += boardState[currentAttempt.attempt][i];
    }
    if (wordsSet.includes(currentWord.toLowerCase())) {
      dispatch(nextRow());
    } else {
      alert("word not found");
    }

    if (currentWord === correctWord) {
      dispatch(setGameFinished(true));
      return;
    }

    if (currentAttempt.attempt === 5) {
      dispatch(setGameFinished(false));
    }
  };

  const onDelete = () => {
    if (letterPosition === 0) return;
    const currentBoard = JSON.parse(JSON.stringify(boardState));
    currentBoard[attempt][letterPosition - 1] = "";
    dispatch(changeBoard(currentBoard));
    dispatch(prevLetter());
  };
  const onSelectLetter = (keyValue) => {
    if (letterPosition > 4 || attempt >= 6) return;
    const currentBoard = JSON.parse(JSON.stringify(boardState));
    currentBoard[attempt][letterPosition] = keyValue;
    dispatch(changeBoard(currentBoard));
    dispatch(nextLetter());
  };

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        lineOneKeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        lineTwoKeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        lineThreeKeys.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currentAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {lineOneKeys.map((key, index) => (
          <Key
            key={index}
            keyValue={key}
            onEnter={onEnter}
            onDelete={onDelete}
            onSelectLetter={onSelectLetter}
            disabled={disabledKeys.includes(key)}
          />
        ))}
      </div>
      <div className="line2">
        {lineTwoKeys.map((key, index) => (
          <Key
            key={index}
            keyValue={key}
            onEnter={onEnter}
            onDelete={onDelete}
            onSelectLetter={onSelectLetter}
            disabled={disabledKeys.includes(key)}
          />
        ))}
      </div>
      <div className="line3">
        <Key
          keyValue={"ENTER"}
          bigKey
          onEnter={onEnter}
          onDelete={onDelete}
          onSelectLetter={onSelectLetter}
        />
        {lineThreeKeys.map((key, index) => (
          <Key
            key={index}
            keyValue={key}
            onEnter={onEnter}
            onDelete={onDelete}
            onSelectLetter={onSelectLetter}
            disabled={disabledKeys.includes(key)}
          />
        ))}
        <Key
          keyValue={"DELETE"}
          onEnter={onEnter}
          onDelete={onDelete}
          onSelectLetter={onSelectLetter}
        />
      </div>
    </div>
  );
};

export { Keyboard };
