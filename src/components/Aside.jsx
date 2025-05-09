import React from "react";
import dp from "../assets/defaultPic.jpg";
import { auth } from "./config/Firebase";
import { signOut } from "firebase/auth";

const Aside = ({ navOpen, userDetails }) => {
  const handeleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <aside className="bg-[#66ad14] lg:flex lg:w-75     text-white px-3 pt-20 hidden lg:h-screen flex-col items-center gap-5 ">
        <div className="flex flex-col items-center gap-5 w-full h-full  ">
          <img src={dp} alt="Default Pic" className="w-32 h-32 rounded-full" />
          <h1 className="mt-3 text-xl font-semibold">Welcome!</h1>
          <h1 className="w-full text-center py-1 border-b border-white/30">
            {userDetails.studentID}
          </h1>
          <h1 className="w-full text-center py-1 border-b border-white/30">
            {userDetails.firstName + " " + userDetails.lastName}
          </h1>
          <h1 className="w-full text-center py-1 border-b border-white/30">
            {userDetails.course}
          </h1>
        </div>

        <div className="w-full mt-auto pb-6">
          <button
            onClick={handeleSignOut}
            className="w-full h-10 border-2 rounded-lg hover:bg-[#064420] hover:border-[#064420] transition-all duration-300"
          >
            Signout
          </button>
        </div>
      </aside>

      {navOpen && (
        <aside className="bg-[#66ad14]  w-full md:hodden  pt-20  text-white px-3 flex-col items-center gap-5  ">
          <div className="flex flex-col items-center gap-5 w-full">
            <img
              src={dp}
              alt="Default Pic"
              className="w-32 h-32 rounded-full"
            />
            <h1 className="mt-3 text-xl font-semibold">Welcome!</h1>
            <h1 className="w-full text-center py-1 border-b border-white/30">
              {userDetails.studentID}
            </h1>
            <h1 className="w-full text-center py-1 border-b border-white/30">
              {userDetails.firstName + " " + userDetails.lastName}
            </h1>
            <h1 className="w-full text-center py-1 border-b border-white/30">
              {userDetails.course}
            </h1>
          </div>
          <div className="w-full mt-auto pb-6">
            <button
              onClick={handeleSignOut}
              className="w-full h-10 border-2 rounded-lg hover:bg-[#064420] hover:border-[#064420] transition-all duration-300"
            >
              Signout
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Aside;
