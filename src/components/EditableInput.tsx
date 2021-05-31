import React, { useState, useEffect } from "react";

type EditableInputProps = {
  displayText: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  className: "" | "cursor-not-allowed";
  childRef: React.MutableRefObject<null>;
  buying: boolean;

}

function EditableInput({
  displayText,
  input,
  childRef,
  buying,
  className,
  ...props
}: EditableInputProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (childRef && childRef.current && editing === true) {
      childRef.current.focus();
    }
  }, [editing, childRef]);
  const keydownHandler = (event: React.KeyboardEvent) => {
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
      onClick={() => setEditing(buying && true)}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {displayText}
    </div>
  );
}

export default EditableInput;
