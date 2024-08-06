// src/components/Loader.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <FaSpinner className="text-white text-5xl animate-spin" />
    </div>
  );
};

export default Loader;
