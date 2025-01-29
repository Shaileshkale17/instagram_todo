import React from "react";

const Button = ({ Title, type, Click }) => {
  return (
    <button
      type={type || "button"}
      onClick={Click}
      className="p-3 bg-black rounded-md  border border-solid border-white hover:bg-white hover:border-black text-white hover:text-black">
      {Title || "Check Me"}
    </button>
  );
};

export default Button;
