import React, { useEffect, useState } from "react";
import user from "../assets/user2.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import Button from "../components/Button";
import { Link } from "react-router-dom";
const Edit = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); // Extract the id from useParams
  const navigate = useNavigate();
  const getdata = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getByid/${id}`
      );
      console.log("res", res);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleted = async (ids) => {
    console.log("Deleted", ids);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deleted/${ids}`
      );
      // console.log(res);
      if (res.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getdata(id);
    }
  }, [id]);

  return (
    <div className="min-h-[37.8rem] px-11 py-5 overflow-y-hidden">
      <div className="flex flex-row gap-14">
        <div className="w-xl">
          <img
            src={data.image || user}
            alt={data.title || "Default"}
            className="h-[20rem] w-[40rem] object-cover"
          />
        </div>
        <div className="flex flex-col flex-wrap gap-1.5">
          <h1 className="text-3xl">{data.title}</h1>
          <p>{data.createdAt ? format(data.createdAt) : "Unknown date"}</p>
          <div className="flex flex-row flex-wrap gap-4.5">
            <Button Title="Delete Me" Click={() => deleted(data._id)} />
            <Link to={`/edit_form/${data._id}`}>
              <Button Title="Update Me" />
            </Link>
          </div>
          <p className="mt-4.5">{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Edit;
