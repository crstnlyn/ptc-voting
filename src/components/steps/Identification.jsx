import React, { useContext, useRef, useState } from "react";
import { StepperContext } from "../StepperContext";
import defaultImage from "../../assets/defaultPic.jpg";

const Identification = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const profilePicRef = useRef(null);
  const schoolIdRef = useRef(null);

  const [profileView, setProfileView] = useState(
    userData?.profileView || defaultImage
  );

  const [schoolIdView, setSchoolIdView] = useState(
    userData?.schoolIdView || defaultImage
  );

  const handleProfileFileClick = () => {
    profilePicRef.current.click();
  };

  const handleSchoolIdClick = () => {
    schoolIdRef.current.click();
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;

        if (type === "profile") {
          setProfileView(previewUrl);
          setUserData((prev) => ({
            ...prev,
            profilePic: file,
            profileView: previewUrl,
          }));
        } else if (type === "schoolId") {
          setSchoolIdView(previewUrl);
          setUserData((prev) => ({
            ...prev,
            schoolId: file,
            schoolIdView: previewUrl,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };

  return (
    <div className="h-full">
      <h1 className="text-xl font-bold text-center uppercase">
        Identification
      </h1>
      <div className=" flex flex-col justify-center items-center lg:flex-row gap-10">
        <div
          id="left"
          className=" bg-[#66ad14] w-auto p-5 flex flex-col items-center justify-center gap-2 rounded-lg shadow-lg"
        >
          <img
            src={profileView}
            alt="Preview"
            className="max-w-60 h-30 lg:w-60 lg:h-60 md:w-40 w-30 rounded-md object-fill shadow-lg"
          />
          <button
            onClick={handleProfileFileClick}
            className="px-6 py-2 bg-[#EFEFEF] text-black rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Choose File
          </button>
          <input
            type="file"
            ref={profilePicRef}
            onChange={(e) => handleFileChange(e, "profile")}
            className="hidden"
            name="profilePic"
            accept="image/*"
          />
        </div>
        <div
          id="right"
          className=" bg-[#66ad14] w-auto p-5 flex flex-col items-center justify-center gap-2 rounded-lg shadow-lg"
        >
          <img
            src={schoolIdView}
            alt="Preview"
            className="max-w-60 h-30 lg:w-60 lg:h-60 md:w-40 w-30 rounded-md object-fill shadow-lg"
          />
          <button
            onClick={handleSchoolIdClick}
            className="px-6 py-2 bg-[#EFEFEF] text-black rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            Choose File
          </button>
          <input
            type="file"
            ref={schoolIdRef}
            onChange={(e) => handleFileChange(e, "schoolId")}
            className="hidden"
            name="schoolId"
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
};

export default Identification;
