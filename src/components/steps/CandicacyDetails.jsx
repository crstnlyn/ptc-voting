import React, { useState, useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { StepperContext } from "../StepperContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CandicacyDetails = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setUserData({ ...userData, platforms: [...items, inputValue] });
      setInputValue(""); // clear the input
    }
  };

  const handleRemove = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
    setUserData({ ...userData, platforms: updatedItems });
  };

  return (
    <div className="h-full px-4">
      <h1 className="text-xl font-bold text-center">Candidacy Details</h1>
      <div className="flex w-full h-full m-2 lg:flex-row flex-col gap-2">
        <form action="" className="p-2 flex flex-col gap-2 lg:w-1/3 w-full">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="position">
              Position Applying For:{" "}
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <select
              name="position"
              id="position"
              className="border-2 px-2 py-2 text-base bg-[#EFEFEF] h-10 rounded-lg shadow-md"
              value={userData.position || ""}
              onChange={handleChange}
            >
              <option value="">Select a Position</option>
              <option value="President">President</option>
              <option value="Vice-President">Vice-President</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Auditor">Auditor</option>
              <option value="P.I.O">P.I.O</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="affiliate">
              Affiliated/Part: (indicate N/A if none)
              <span className="text-red-600 font-semibold">*</span>
            </label>
            <input
              type="text"
              className="border-2 px-2 py-2 text-base bg-[#EFEFEF] shadow-md rounded-lg"
              name="affiliate"
              value={userData.affiliate || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="platforms">Platforms</label>
            <input
              className="h-10 bg-[#EFEFEF] shadow-md border-1 rounded-lg px-2"
              type="text"
              name="platforms"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="button"
              className="bg-green-600 text-white shadow-lg py-1 uppercase rounded-lg"
              onClick={handleAdd}
            >
              Add Platform
            </button>
          </div>
        </form>
        {/* Display platforms */}
        <div className="border-2  basis-2/3 lg:h-70 flex items-center flex-col p-2 overflow-y-scroll rounded-lg bg-[#EFEFEF]">
          <h3 className="mt-4 font-semibold">Added Platforms:</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border-1 px-2 py-1">Platform</th>
                <th className="border-1 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.platforms &&
                userData.platforms.map((platform, index) => (
                  <tr key={index}>
                    <td className="border-1 px-2 py-1 whitespace-normal break-words max-w-[80px]">
                      <p>{platform}</p>
                    </td>
                    <td className="border-1 px-2 py-1 text-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemove(index)}
                        className="text-red-500 hover:text-red-400 duration-300 ease-in-out "
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandicacyDetails;
