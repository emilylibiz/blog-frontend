import React from "react";
import Link from "next/link";

const WelcomeBanner = () => {
  return (
    <div
      className="relative flex items-center justify-center w-full h-[33vh]  bg-center bg-cover text-white"
      style={{ backgroundImage: "url(/road.jpg)" }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      {/* Ensure the content is positioned above the overlay */}
      <div className="relative p-4 sm:p-6 lg:p-8 max-w-lg mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold leading-tight shadow-lg">
          The Part-time Millionaire
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-sm lg:text-lg shadow-lg">
          Hi,
          我是Emily，二娃妈妈，科技大厂打工人，正在兼职创业追求财富和时间自由。
          欢迎来到我的站点，我会经常分享我的创业历程，直到梦想变成现实。
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <Link href="/aboutme" passHref>
            <button className="text-white font-bold py-2 px-4 rounded shadow-lg border border-white">
              关于我
            </button>
          </Link>
          {/* <button className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg">
            订阅
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
