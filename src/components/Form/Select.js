import React from "react";

const Select = ({ name, value, onChange, options, label }) => {
  return (
    <div className="Select">
      <label htmlFor={name}>{label}:</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
