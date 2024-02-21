import React from 'react';

// const WelcomeBanner = () => {
//   return (
//     <div
//     className="text-white text-center w-full"
//     // className="flex flex-col justify-center items-center w-full bg-cover bg-center bg-no-repeat text-white text-center"
//     style={{
//       backgroundImage: 'url(/welcome.png)',
//       backgroundSize: 'contain',
//       backgroundPosition: 'center',
//       // backgroundRepeat: 'no-repeat', 
//       textShadow: '2px 2px 4px #000000',
//       height: '33vh', // Set the height to be one-third of the viewport height
//       textShadow: '2px 2px 4px #000000',
//     }}
//     >
//     {/* <div
//       className="text-white text-center w-full bg-cover bg-center bg-no-repeat h-1/3"
//       style={{ backgroundImage: 'url(/welcome.png)' }}
//     > */}
//       <div className="p-8 max-w-2xl mx-auto text-center">
//         <h1 className="text-6xl font-bold">奔向财富自由的旅程</h1>
//         <p className="mt-4 text-xl">
//           我叫Emily, 科技大厂打工人，二娃妈妈，经过裁员，突然意识到生活巨变，想要的自由靠打工完全无法实现，于是开始创业。
//           我会在这里每周分享创业投资历程，学到的知识, 来鼓励和帮助有同样想法的人。
//         </p>
//         <div className="mt-8 flex justify-center gap-4">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             订阅我
//           </button>
//           <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//             关于我
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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



// const WelcomeBanner = () => {
//   return (
//     // Flex container for full width, vertical and horizontal centering
//     <div
//       className="flex flex-col justify-center items-center w-full bg-cover bg-center bg-no-repeat text-white"
//       style={{
//         backgroundImage: 'url(/welcome.png)',
//         height: '33vh', // Adjust the height as necessary
//       }}
//     >
//       {/* Max width container with padding for text, adjust 'max-w-md' as needed */}
//       <div className="px-4 sm:px-6 lg:px-8 max-w-md mx-auto text-center">
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">奔向财富自由的旅程</h1>
//         <p className="mt-2 text-sm md:text-base lg:text-lg">
//           我叫Emily, 科技大厂打工人，二娃妈妈，经过裁员，突然意识到生活巨变，想要的自由靠打工完全无法实现，于是开始创业。
//           我会在这里每周分享创业投资历程，学到的知识, 来鼓励和帮助有同样想法的人。
//         </p>
//         <div className="mt-4 flex justify-center gap-4">
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             订阅我
//           </button>
//           <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
//             关于我
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeBanner;
