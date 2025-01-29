import mongoose from "mongoose";

const instagramTodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    cloudinary_public_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const instagramTodo = mongoose.model("instagramTodo", instagramTodoSchema);
export default instagramTodo;
