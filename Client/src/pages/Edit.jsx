import React, { useEffect, useState } from "react";
import user from "../assets/user2.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [data, setData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getdata = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getByid/${id}`
      );
      setData(res.data.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  const deleted = async (ids) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deleted/${ids}`
      );
      if (res.status === 200) {
        toast.info("Todo Deleted successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getdata(id);
    }
  }, [id]);

  return (
    <div
      className={`${
        data.description && data.description.length >= 40
          ? "min-h-screen"
          : "h-[37.3rem] "
      } lg:min-h-[37.8rem] px-2.5 md:px-11 py-5 overflow-y-hidden flex flex-wrap`}>
      <div className="flex flex-col md:flex-row gap-14">
        <div className="w-full">
          <img
            src={data.image || user}
            alt={data.title || "Default"}
            className="h-[18rem] w-full mt-2 lg:mt-0    lg:h-[36rem] lg:w-[40rem] object-contain "
          />
        </div>
        <div className="flex w-full flex-col flex-wrap gap-1.5">
          <h1 className="text-3xl">{data.title}</h1>
          <p>{data.createdAt ? format(data.createdAt) : "Unknown date"}</p>
          <div className="flex flex-row flex-wrap gap-4.5">
            <Button Title="Delete Me" Click={() => setShowPopup(true)} />
            <Link to={`/edit_form/${data._id}`}>
              <Button Title="Update Me" />
            </Link>
          </div>
          <p className="mt-4.5 w-full">
            {data.description || "No description available"}
          </p>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-gray-600">
              You can delete this Todo. If you're sure, click the delete button.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button Title="Cancel" Click={() => setShowPopup(false)} />
              <Button
                Title="Delete"
                Click={() => {
                  deleted(data._id);
                  setShowPopup(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
