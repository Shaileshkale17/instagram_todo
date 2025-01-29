import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navber from "./components/Navber";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navber />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
