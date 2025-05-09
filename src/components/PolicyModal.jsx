import React from "react";

const PolicyModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      id="modal"
      className=" fixed w-full h-full bg-[rgb(0,0,0,0.4)] top-0 left-0 flex justify-center items-center mt-5 "
    >
      <div
        id="modal-content"
        className="max-w-[90%] min-w-[40%] h-auto lg:h-150 bg-[rgba(226_226_226)] flex flex-col justify-center items-center relative rounded-[10px] shadow-lg py-10"
      >
        {children}
      </div>
    </div>
  );
};

export default PolicyModal;
