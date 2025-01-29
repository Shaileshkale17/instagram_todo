import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnection from "./database/index.js";
import todorouter from "./Routers/Todo.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Routes

app.use("/api/todo", todorouter);

DBconnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database: ", error);
  });
