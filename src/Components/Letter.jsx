import { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    correctword,
    currAttempt,
    setDisabledLetters,
    gameOver,
    shake,
  } = useContext(AppContext);

  const letter = board[attemptVal][letterPos];
  const correct = correctword.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctword.toUpperCase().includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...new Set([...prev, letter])]);
    }
  }, [letter, correct, almost, currAttempt.attempt, setDisabledLetters]);

  return (
    <input
      className={`letter ${
        attemptVal === currAttempt.attempt && shake ? "Shake" : ""
      } `}
      value={letter}
      id={letterState}
      disabled={gameOver}
      style={{
        textAlign: "center",
        userSelect: "none",
      }}
      readOnly
    />
  );
};

export default Letter;
