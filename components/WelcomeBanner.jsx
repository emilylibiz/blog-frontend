import React from 'react';

const WelcomeBanner = () => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-[33vh]  bg-center bg-cover text-white"
      style={{ backgroundImage: 'url(/welcome.png)' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>
      
      {/* Ensure the content is positioned above the overlay */}
      <div className="relative p-4 sm:p-6 lg:p-8 max-w-lg mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight shadow-lg">
          奔向财富自由的旅程
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg shadow-lg">
          我叫Emily, 科技大厂打工人，二娃妈妈，经过裁员，突然意识到生活巨变，想要的自由靠打工完全无法实现，于是开始创业。
          我会在这里每周分享创业投资历程，学到的知识, 来鼓励和帮助有同样想法的人。
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg">
            订阅我
          </button>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded shadow-lg">
            关于我
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

