import React from "react";
import { RiDeleteBack2Line } from "react-icons/ri";


const Key = ({
  keyValue,
  bigKey,
  onEnter,
  onDelete,
  onSelectLetter,
  disabled,
}) => {
  const selectLetter = () => {
    if (keyValue === "ENTER") {
      onEnter();
    } else if (keyValue === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyValue);
    }
  };
  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyValue === 'DELETE' ? <RiDeleteBack2Line /> : keyValue }
    </div>
  );
};

export { Key };
