import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import axios from "axios";
import Card from "../components/Card";
import { Link } from "react-router-dom";
const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const getdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getall`);
    console.log(res);
    setData(res.data.data);
  };
  useEffect(() => {
    getdata();
  }, [setData]);

  return (
    <div className=" lg:mx-10 flex flex-col  min-h-screen">
      <div className="flex justify-end mb-3.5 lg:mb-0">
        <Link to={`/add_form`}>
          <Button Title="Add Todo" />
        </Link>
      </div>

      <div className="flex justify-center ">
        <InputBox
          style="w-full lg:w-[30rem] pl-11 py-1.5 rounded-2xl border"
          type="search"
          placeholder="search your todo"
          gitValue={search}
          setValue={setSearch}
        />
      </div>
      <div className="flex flex-row flex-wrap w-full gap-8 md:gap-11 justify-center lg:justify-start my-10">
        {data
          ?.filter(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase())
          )
          ?.map((item) => (
            <Card
              id={item._id}
              createdAt={item.createdAt}
              image={item.image}
              title={item.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
