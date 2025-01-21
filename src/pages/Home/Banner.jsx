import React from 'react';

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: "url('https://i.ibb.co.com/tZmLk6S/4031.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute top-40 left-60 z-5 text-white text-center px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mt-10">Find Your Dream Home</h1>
        <p className="mt-4 text-lg md:text-xl">Explore the best properties in your area.</p>
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by location"
            className="px-4 py-2 w-full md:w-1/2 rounded-l-lg"
          />
          <button className="bg-blue-500 px-6 py-2 rounded-r-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
