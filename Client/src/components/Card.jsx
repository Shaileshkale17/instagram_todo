import React from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
const Card = ({ id, createdAt, image, title }) => {
  console.log(`Card ${id}`);
  return (
    <Link to={`/edit/${id}`}>
      <div
        className=" flex flex-col justify-center  border border-solid border-white  h-60 w-2xs p-3 text-white bg-black rounded-xl"
        key={id}>
        <h3 className="h-11 font-bold mb-1.5">
          {title.length == 20 ? title : title.slice(0, 30)}
          {title.length >= 30 ? "..." : ""}
        </h3>
        <img src={image} alt={title} className="w-3xl h-36 object-cover " />
        <p className="flex flex-row-reverse mt-1.5">{format(createdAt)}</p>
        {/* <p>{description}</p> */}
      </div>
    </Link>
  );
};

export default Card;
