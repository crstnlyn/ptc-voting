import React from "react";

const Loading = () => {
  return (
    <div className=" absolute top-0 left-0 flex items-center justify-center bg-[#f5f7f8] w-full h-full z-1">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50"></div>

        {/* Loading text */}
        <p className="mt-6 text-gray-600 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
