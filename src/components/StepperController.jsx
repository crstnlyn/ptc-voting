import React from "react";

const StepperController = ({ handleClick, currentStep, steps, isLoading }) => {
  return (
    <div className=" container mb-8 flex justify-around mt-4 rounded-xl">
      <button
        className={`bg-white  text-slate-400 border-slate-300 py-2 px-5 uppercase rounded-xl  cursor-pointer font-semibold hover:bg-slate-700 hover:text-white transition-all duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-100" : " "
        }`}
        onClick={() => handleClick()}
      >
        Back
      </button>
      <button
        className="bg-[#66ad14] text-white border-slate-300 py-2 px-5 uppercase rounded-xl cursor-pointer font-semibold hover:bg-slate-700 hover:text-white transition-all duration-200 ease-in-out "
        onClick={() => handleClick("next")}
      >
        {currentStep == steps.length - 1 ? "Confirm " : "next "}
      </button>
    </div>
  );
};

export default StepperController;
