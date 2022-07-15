import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { Board } from "./containers/Board";
import { Keyboard } from "./containers/Keyboard";
import { GameFinished } from "./components/GameFinished";
import store from "./store";
import { generateWordSet } from "./defaultValue";
import { setCorrectWord, setWordsSet } from "./store/slices/board";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { gameFinished } = useSelector((state) => state.board);

  useEffect(() => {
    generateWordSet().then((words) => {
      dispatch(setWordsSet([...words.wordSet]));
      dispatch(setCorrectWord(words.todaysWord.toUpperCase()));
    });
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Provider store={store}>
        <div className="game">
          <Board />
          {gameFinished.gameOver ? <GameFinished /> : <Keyboard />}
        </div>
      </Provider>
    </div>
  );
}

export default App;
