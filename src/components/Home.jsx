import PartialResult from "./admin/PartialResult";
import Navbar from "./Navbar";
import React from "react";

const Home = () => {
  return (
    <div className="min-w-full h-screen flex">
      <Navbar />
      <div className="w-full mt-20">
        <PartialResult />
      </div>
    </div>
  );
};

export default Home;
