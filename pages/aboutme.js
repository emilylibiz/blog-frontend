// pages/aboutme.js

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const AboutMe = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>关于我 - Emily的博客</title>
        <meta name="description" content="了解更多关于Emily的故事。" />
      </Head>
      <h1 className="text-4xl font-bold text-center my-8">关于我</h1>

      {/* 你可以在这里添加一张代表性的图片 */}
      {/* <div className="text-center">
        <Image src="/path-to-your-image.jpg" alt="Emily" width={200} height={200} className="rounded-full mx-auto" />
      </div> */}


      <div className="px-20 border-t-2 ">
        <p className="text-lg mt-6">嗨，欢迎来到我的博客！我叫Emily，是一个身兼数职的普通妈妈，既是孩子们依赖的妈咪，又是科技大厂写代码的软件工程师，更是自己小企业的掌舵人。我的生活就像一部多角色剧，每一天都在不同的角色间切换，迎接着新的挑战与机遇。</p>
        <p className="text-lg mt-4">别看我现在对着电脑打代码，我可是个文科生出身，生完孩子后才决定跳进这个充满逻辑和代码的科技行业。30多岁转行，听起来有点疯狂对吧？但是，嘿，人生就是要有点挑战才有意思嘛！</p>
        <p className="text-lg mt-4">曾经的积极努力让半路出家的我进入了梦想公司Google，路上走过的每一个难关，都让我深信：只要心中有梦，相信自己，加上不懈的努力，新引力法则会把白日梦变成现实。</p>
        <p className="text-lg mt-4">现在，我又开启疯狂2.0模式，再次踏上追梦之旅——创业！我渴望的不再是职业上的成就，而是自由，能够按照自己的节奏规划时间，告别早九晚五的打工生涯。而这份自由，需要拥有自己的企业才能实现。</p>
        <p className="text-lg mt-4">我创建了这个博客，就是想和大家分享我创业路上的冒险故事，不管是在创业路上的成功失败，经验教训，还是在家庭，工作和梦想之间玩杂耍找平衡，我都会毫无保留的与你分享。</p>
        <p className="text-lg mt-4">在这里，你不仅会看到一个女性在职场的拼搏，还会看到一个母亲在家庭和工作间如何平衡，以及一个创业者如何将梦想一步步变为现实。我希望我的故事能够激励和鼓舞每一个有梦想、敢于追求的你，无论你来自哪里，无论你的背景如何。</p>
        <p className="text-lg mt-4 mb-8">和我一起来分享这段奇妙的旅程吧！希望在这里，你能找到共鸣，找到动力，一起向着梦想前进。期待在我的博客里与你相遇，共同成长！</p>
      
        {/* 如果你想添加返回首页的链接 */}
        <div className=" mt-8">
          <Link href="/">
            <p className="text-blue-500 hover:underline">返回首页</p>
          </Link>
        </div>
        <div className=" mt-1">
          <Link href="/category">
            <p className="text-blue-500 hover:underline">阅读博客</p>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AboutMe;
