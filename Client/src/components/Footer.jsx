import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="p-2.5 bg-black text-white flex justify-center font-extralight">
      All Copyright Reserved By
      <Link to="https://protfolio-shailesh-full-stack-developer.vercel.app/">
        <span className="cursor-pointer"> © Shailesh Kale</span>
      </Link>
    </div>
  );
};

export default Footer;
