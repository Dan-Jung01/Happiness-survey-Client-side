import React from "react";
import chartImage from "../components/images/chart.png";

function Home() {
  return (
    <section className='flex max-h-full items-center justify-items-center justify-center mt-52'>
      <figure className=' '>
        <img
          className='rounded-full h-96 w-96'
          src={chartImage}
          alt='chart image'
        />
      </figure>
      <div className='ml-10 '>
        <h1 className='font-bold text-4xl ml-8 mb-1'>Welcome to</h1>
        <h1 className='font-bold text-6xl mb-5'>"Happiness Wonder"</h1>
        <h2 className='font-bold text-5xl leading-tight ml-8 text-gray-700'>
          Get data result <br />
          with <span className='text-yellow-500'>Visualization!</span>
        </h2>
        <p className='mt-4 text-gray-600 ml-8'>
          Happy Wonder provides visualization data with search, filter function
          <br />
          Therefore, you will be able to compare several data more efficiently
        </p>
      </div>
    </section>
  );
}

export default Home;
