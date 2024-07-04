import "./App.css";
import Board from "./Components/Board";
import GameOver from "./GameOver";
import Keyboard from "./Components/Keyboard";
import { createContext, useEffect, useState } from "react";
export const AppContext = createContext();
import { boardDefault, generateWordSet } from "./assets/BoardDefault";

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordset, setWordSet] = useState(new Set());
  const [shake, setShake] = useState(false);

  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [correctword, setCurrWord] = useState("");
  const [currentword, setCurrentword] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words.todaysWord);
      setWordSet(words.wordSet);
      setCurrWord(words.todaysWord.toUpperCase()); // Ensure correctword is uppercase
    });
  }, []);

  const onSelectLetter = (keyval) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyval.toUpperCase(); // Ensure letter is uppercase
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
    setBoard(newBoard);
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) {
      setAlertMessage("Not enough letters");
      setShake(true);
      setShowAlert(true);
      setTimeout(() => {
        setShake(false);
        setAlertMessage("");
        setShowAlert(false);
      }, 500);
      return;
    }

    let newWord = "";
    for (let i = 0; i < 5; i++) {
      newWord += board[currAttempt.attempt][i].toLowerCase();
    }
    setCurrentword(newWord); // Set the complete word here

    if (wordset.has(newWord)) {
      const nextAttempt = currAttempt.attempt + 1;
      setCurrAttempt({ attempt: nextAttempt, letterPos: 0 });
    } else {
      setAlertMessage("Word not in dictionary");
      setShake(true);
      setShowAlert(true);
      setTimeout(() => {
        setShake(false);
        setAlertMessage("");
        setShowAlert(false);
      }, 500);
      return;
    }

    if (newWord === correctword.toLowerCase()) {
      setGameOver(true);
      setAlertMessage("You win");
      setShowAlert(true);
      setTimeout(() => {
        setAlertMessage("");
        setShowAlert(false);
      }, 5000);
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver(true);
      setAlertMessage("You lost");
      setShowAlert(true);
      setTimeout(() => {
        setAlertMessage("");
        setShowAlert(false);
      }, 5000);
      return;
    }
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctword,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          shake,
          currentword,
        }}
      >
        {showAlert && (
          <div className="alert-container">
            <div className="alert">{alertMessage}</div>
          </div>
        )}
        <Board />
        {gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
