import React, { useEffect, useState, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState();
  const stepRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count == stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index == 0 ? true : false,
          selected: index == 0 ? true : false,
        }
      )
    );
    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  if (!newStep || newStep.length === 0) return null;

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index != newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className=" relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 h-10 w-10 flex items-center justify-center py-3 
              ${
                step.selected
                  ? "bg-green-600 text-white font-bold border-green-600"
                  : "border-gray-300 text-gray-600"
              }`}
          >
            {step.completed ? index + 1 : index + 1}
          </div>
          <div
            className={`absolute top-0  mt-14 w-auto text-center text-[10px] lg:w-32 lg:text-xs font-medium uppercase ${
              step.highlighted ? " text-gray-900" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-3 transition duration-500 ease-in-out text-gray-300 ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-center items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
