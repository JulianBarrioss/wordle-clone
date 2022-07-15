import React from "react";
import { useSelector } from "react-redux";

const GameFinished = () => {
  const { gameFinished, correctWord, currentAttempt } = useSelector(
    (state) => state.board
  );

  const refreshPage = ()=>{
    window.location.reload();
 }
  return (
    <div className="gameOver">
      <h3>
        {gameFinished.guessedWord ? "You guessed the word" : "You Failed"}
      </h3>
      {!gameFinished.guessedWord && <h1>Correct: {correctWord}</h1>}
      {gameFinished.guessedWord && (
        <h3> You guessed it in  {currentAttempt.attempt} tries </h3>
      )}
      <button onClick={refreshPage}>Play again</button>
    </div>
  );
};

export { GameFinished };
