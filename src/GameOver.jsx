import Key from "./Components/Key";
import { useContext } from "react";
import { AppContext } from "./App";
const GameOver = () => {
  const letts1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const letts2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const letts3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const { disabledLetters } = useContext(AppContext);
  return (
    <div>
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

export default GameOver;
