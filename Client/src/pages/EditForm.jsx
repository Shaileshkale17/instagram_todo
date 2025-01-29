import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox"; // Import the InputBox component

const EditForm = () => {
  const { id } = useParams(); // Extract id from URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const isEditMode = !!id; // Determine if we're in edit mode

  // Fetch existing data if in Edit Mode
  useEffect(() => {
    if (isEditMode) {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/getByid/${id}`
          );
          setFormData(res.data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
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
          formData
        );
        console.log(res);
        alert("Data updated successfully!");
      } else {
        // Add new entry
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/create`,
          formData
        );
        alert("Data added successfully!");
      }
      navigate("/"); // Redirect to the main page
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-[37.8rem] px-11 py-5">
      <h1 className="text-3xl mb-5">{isEditMode ? "Edit Data" : "Add Data"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Reusable InputBox for Title */}
        <InputBox
          title="Title"
          gitValue={formData.title}
          setValue={(value) => handleChange("title", value)}
          placeholder="Enter title"
          style="p-2 border rounded-md"
        />
        {/* Reusable InputBox for Description */}
        <InputBox
          title="Description"
          gitValue={formData.description}
          setValue={(value) => handleChange("description", value)}
          placeholder="Enter description"
          style="p-2 border rounded-md"
          type="textarea" // Adjust as needed if InputBox supports different types
        />
        {/* Reusable InputBox for Image URL */}
        <InputBox
          title="Image URL"
          gitValue={formData.image}
          setValue={(value) => handleChange("image", value)}
          placeholder="Enter image URL"
          style="p-2 border rounded-md"
          type="file"
        />
        {/* Submit Button */}
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
