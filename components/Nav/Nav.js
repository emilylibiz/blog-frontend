import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex">
                <li className="mr-6">
                    <Link href="/">
                        <span className="text-white hover:text-gray-300 cursor-pointer">首页</span>
                    </Link>
                </li>
                <li className="mr-6">
                    <Link href="/bloglist">
                        <span className="text-white hover:text-gray-300 cursor-pointer">博客</span>
                    </Link>
                </li>
                <li className="mr-6">
                    <Link href="/aboutme">
                        <span className="text-white hover:text-gray-300 cursor-pointer">关于我</span>
                    </Link>
                </li>
                <li className="mr-6">
                    <Link href="/contact">
                        <span className="text-white hover:text-gray-300 cursor-pointer">商业合作</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
