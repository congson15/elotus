import React from "react";

const SkeletonList = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="p-4 rounded-md w-1/2">
        <div className="h-80 bg-white rounded-[30px] animate-pulse"></div>
      </div>
      <div className="w-full space-y-20">
          <div className="h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
    </div>
  );
};
export default SkeletonList;
