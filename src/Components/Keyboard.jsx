import { useCallback, useEffect, useContext } from "react";
import { AppContext } from "../App";
import Key from "./Key";

const Keyboard = () => {
  const letts1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const letts2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const letts3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { onEnter, onDelete, onSelectLetter, disabledLetters } =
    useContext(AppContext);

  const handelKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key == "Backspace") {
      onDelete();
    } else {
      letts1.forEach((element) => {
        if (event.key.toLowerCase() === element.toLowerCase()) {
          onSelectLetter(element);
        }
      });
      letts2.forEach((element) => {
        if (event.key.toLowerCase() === element.toLowerCase()) {
          onSelectLetter(element);
        }
      });
      letts3.forEach((element) => {
        if (event.key.toLowerCase() === element.toLowerCase()) {
          onSelectLetter(element);
        }
      });
    }
  });
  useEffect(() => {
    document.addEventListener("keydown", handelKeyboard);
    return () => {
      document.removeEventListener("keydown", handelKeyboard);
    };
  }, [handelKeyboard]);
  return (
    <div onKeyDown={handelKeyboard}>
      <div className="line1">
        {letts1.map((key, index) => {
          return (
            <Key
              key={index}
              keyval={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line2">
        {letts2.map((key, index) => {
          return (
            <Key
              key={index}
              keyval={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Key keyval="Enter" bigkey={true} disabled={disabledLetters} />
        {letts3.map((key, index) => {
          return (
            <Key
              key={index}
              keyval={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyval="Delete" bigkey={true} />
      </div>
    </div>
  );
};

export default Keyboard;
