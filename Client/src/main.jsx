import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import EditForm from "./pages/EditForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/edit_form/:id",
        element: <EditForm />,
      },
      {
        path: "/add_form",
        element: <EditForm />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
