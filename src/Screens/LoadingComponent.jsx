import React from 'react';
import { ThreeDots } from 'react-loading-icons';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-grow items-center justify-center ">
      <ThreeDots stroke="black" fill='black' speed={1} />
    </div>
  );
};

export default LoadingSpinner;
