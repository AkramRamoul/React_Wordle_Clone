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
  const isDisabled = gameOver;
  const letter = board[attemptVal][letterPos];
  const correct = correctword.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctword.includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);

  return (
    <input
      className={`letter ${
        attemptVal === currAttempt.attempt && shake ? "Shake" : ""
      } `}
      value={letter}
      id={letterState}
      disabled={isDisabled}
      style={{
        textAlign: "center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
};

export default Letter;
