import express from "express";
import {
  createTodo,
  deleted,
  findByIdTodo,
  getall,
  updated,
} from "../Controllers/InstagramTodo.Controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createTodo
);

router.get("/getall", getall);

router.get("/getByid/:id", findByIdTodo);

router.put(
  "/updated/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updated
);

router.delete("/deleted/:id", deleted);

export default router;
