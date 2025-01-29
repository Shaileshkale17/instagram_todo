import React from "react";
import { Link } from "react-router-dom";
const Navber = () => {
  return (
    <div className="flex flex-row items-start mb-2.5 p-2.5 bg-black text-white font-extralight">
      <div>
        <Link to="/">
          <h1>MyTodo</h1>
        </Link>
      </div>
    </div>
  );
};

export default Navber;
