import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

const Textarea = ({ type, name, value, onChange, label, validator, error }) => {
  const [focused, setFocused] = useState(false);
  const [valid, setValid] = useState(true);

  /**
   * Handle input field validation on blur event
   */
  const onBlur = () => {
    const isValid = validator(value);
    setFocused(false);
    setValid(isValid);
  };

  return (
    <div
      className={`Input ${!valid && "Input--invalid"}`}
      data-tip
      data-for={name}
      data-delay-show="750"
    >
      <ReactTooltip id={name} type="dark" effect="solid">
        <span>{error}</span>
      </ReactTooltip>
      <textarea
        className={`Textarea Textarea${
          value.length || focused ? "--focused" : ""
        }`}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={onBlur}
        name={name}
        placeholder={label}
      />
    </div>
  );
};

export default Textarea;
