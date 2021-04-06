import React, { useState, useEffect } from "react";

const EditableInput = ({
  displayText,
  input,
  childRef,
  className,
  ...props
}) => {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (childRef && childRef.current && editing === true) {
      childRef.current.focus();
    }
  }, [editing, childRef]);
  const keydownHandler = (event) => {
    const { key } = event;
    const keys = ["Escape", "Tab", "Enter"];
    if (keys.indexOf(key) > -1) {
      setEditing(false);
    }
  };

  return editing ? (
    <div
      onBlur={() => setEditing(false)}
      onKeyDown={keydownHandler}
      className={`${className}`}
      {...props}
    >
      {input}
    </div>
  ) : (
    <div
      onClick={() => setEditing(true)}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {displayText}
    </div>
  );
};

export default EditableInput;
