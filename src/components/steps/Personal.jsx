import React, { useContext } from "react";
import { StepperContext } from "../StepperContext";

const Personal = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="w-full px-4 py-6">
      <h1 className="font-bold text-xl md:text-2xl uppercase text-center mb-6">
        Personal Information
      </h1>

      <form className="flex flex-col gap-6 max-w-6xl mx-auto">
        {/* Name Section */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="firstname">
              Firstname: <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              className="border-2 px-2 py-2 rounded-md text-base"
              type="text"
              id="firstname"
              name="firstname"
              value={userData["firstname"] || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="lastname">
              Lastname: <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              className="border-2 px-2 py-2 rounded-md text-base"
              type="text"
              id="lastname"
              name="lastname"
              value={userData["lastname"] || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="middleName">
              Middlename: <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              className="border-2 px-2 py-2 rounded-md text-base"
              type="text"
              id="middleName"
              name="middleName"
              value={userData["middleName"] || ""}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="studentID">
                Student ID:{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="text"
                id="studentID"
                name="studentID"
                value={userData["studentID"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="course">
                Course/Program:{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="text"
                id="course"
                name="course"
                value={userData["course"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="yearLevel">
                Year Level:{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="text"
                id="yearLevel"
                name="yearLevel"
                value={userData["yearLevel"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="section">
                Section: <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="text"
                id="section"
                name="section"
                value={userData["section"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="email">
                Email: <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="email"
                id="email"
                name="email"
                value={userData["email"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="phoneNumber">
                Phone Number:{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                className="border-2 px-2 py-2 rounded-md text-base"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={userData["phoneNumber"] || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Personal;
