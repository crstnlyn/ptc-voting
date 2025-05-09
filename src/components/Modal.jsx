import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      id="modal"
      className=" fixed w-full h-full bg-[rgb(0,0,0,0.4)] top-0 left-0 flex justify-center items-center "
    >
      <div
        id="modal-content"
        className="w-[90%] lg:w-[50%]  h-auto lg:h-auto bg-[rgba(226_226_226)] flex flex-col justify-center items-center relative rounded-[10px] shadow-lg py-5 lg:py-10"
      >
        <button
          id="modal-button"
          onClick={onClose}
          className=" absolute top-[10px] right-[10px] w-12 h-[30px] rounded-sm shadow-black shadow-md hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
