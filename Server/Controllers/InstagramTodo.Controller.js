import ConnectCloudinary from "../Config/cloudinary.js";
import instagramTodo from "../model/instagram_todo.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createTodo = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    if (!(title || description)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid title or description" });
    }
    await ConnectCloudinary();
    const imageUrlLocalPath = req.files?.image[0]?.path;
    // console.log("imageUrlLocalPath", imageUrlLocalPath);
    let result = await cloudinary.uploader.upload(imageUrlLocalPath, {
      resource_type: "image",
    });
    const create = await instagramTodo.create({
      title,
      description,
      image: result.secure_url,
      cloudinary_public_id: result.public_id,
    });
    res.status(200).json({ data: create, message: "Success", status: 200 });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getall = async (req, res) => {
  try {
    const data = await instagramTodo.find({}).sort({ updatedAt: -1 });
    res.status(200).json({ data: data, message: "Success", status: 200 });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

export const findByIdTodo = async (req, res) => {
  // console.log(req.params.id);
  try {
    if (!req.params.id) {
      return res.status(404).json({
        success: false,
        message: "id not found.",
      });
    }
    const data = await instagramTodo.findById(req.params.id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updated = async (req, res) => {
  try {
    await ConnectCloudinary();

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const Todo = await instagramTodo.findById(req.params.id);

    if (!Todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found.",
      });
    }

    let image = Todo.image; // Use the fetched Todo's image

    if (req.files && req.files.image && req.files.image[0]) {
      if (Todo.cloudinary_public_id) {
        // Delete existing Cloudinary image
        await cloudinary.uploader.destroy(Todo.cloudinary_public_id);
      }

      // Upload new image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(
        req.files.image[0].path,
        {
          resource_type: "image",
        }
      );

      image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    const updatedData = await instagramTodo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image: image?.url,
        cloudinary_public_id: image?.public_id,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Todo updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleted = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({
        success: false,
        message: "id not found.",
      });
    }
    await ConnectCloudinary();

    const data = await instagramTodo.findById(req.params.id);
    // console.log(data);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    const publicId = data.cloudinary_public_id;

    await cloudinary.uploader.destroy(publicId);

    await instagramTodo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "todo and associated image deleted successfully!",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
