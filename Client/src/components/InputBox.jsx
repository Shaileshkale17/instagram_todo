import React from "react";
import search from "../assets/find.png";

const InputBox = ({ title, type, gitValue, setValue, placeholder, style }) => {
  const handleInputChange = (e) => {
    if (type === "file") {
      setValue(e.target.files[0]); // For file input
    } else {
      setValue(e.target.value); // For other input types
    }
  };

  return (
    <div className="flex flex-col flex-wrap gap-1 relative">
      <label htmlFor={title}>{title}</label>
      {type === "textarea" ? (
        <textarea
          className={`${style}`}
          name={title}
          id={title}
          value={gitValue}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows="5"></textarea>
      ) : (
        <input
          className={`${style}`}
          type={type || "text"}
          name={title}
          id={title}
          value={type === "file" ? undefined : gitValue} // Avoid setting value for file inputs
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      )}
      {type === "search" && (
        <img
          src={search}
          alt="search"
          className="absolute top-2 w-7 h-auto left-2"
        />
      )}
    </div>
  );
};

export default InputBox;
