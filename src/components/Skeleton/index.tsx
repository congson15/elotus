import React from "react";

const CardSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-full ">
      <div className="p-4 rounded-md w-full">
        <div className="h-80 bg-white rounded-[30px] animate-pulse"></div>
        <div className="mt-8 h-32 w-full space-y-3">
          <div className="h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
