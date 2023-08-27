import { useContext } from "react";
import { AppContext } from "../App";

const Key = ({ keyval, bigkey, disabled }) => {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);
  const selectLetter = () => {
    if (keyval === "Enter") {
      onEnter();
    } else if (keyval == "Delete") {
      onDelete();
    } else {
      onSelectLetter(keyval);
    }
  };

  return (
    <div
      className="key"
      id={bigkey ? "big" : disabled ? "disabled" : ""}
      onClick={selectLetter}
    >
      {keyval}
    </div>
  );
};

export default Key;
