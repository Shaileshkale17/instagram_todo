import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // console.log("File received:", file.originalname);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
