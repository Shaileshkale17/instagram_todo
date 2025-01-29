import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import { toast } from "react-toastify";
const EditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/getByid/${id}`
          );
          setFormData(res.data.data);
        } catch (error) {
          toast.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [id, isEditMode]);

  // Handle input changes
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (isEditMode) {
        // Update existing entry
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/updated/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Data updated successfully!");
      } else {
        // Add new entry
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Data added successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen lg:min-h-[37.8rem] px-11 py-5">
      <h1 className="text-3xl mb-5">{isEditMode ? "Edit Data" : "Add Data"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputBox
          title="Title"
          gitValue={formData.title}
          setValue={(value) => handleChange("title", value)}
          placeholder="Enter title"
          style="p-2 border rounded-md"
        />
        <InputBox
          title="Description"
          gitValue={formData.description}
          setValue={(value) => handleChange("description", value)}
          placeholder="Enter description"
          style="p-2 border rounded-md"
          type="textarea"
        />
        <InputBox
          title="Image URL"
          gitValue={formData.image}
          setValue={(value) => handleChange("image", value)}
          placeholder="Enter image URL"
          style="p-2 border rounded-md"
          type="file"
        />
        <button
          type="submit"
          className="p-3 bg-black text-white rounded-md hover:bg-gray-800">
          {isEditMode ? "Update Data" : "Add Data"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
