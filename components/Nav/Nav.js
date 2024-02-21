import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex">
                <li className="mr-6">
                    <a href="/" className="text-white hover:text-gray-300">首页</a>
                </li>
                <li className="mr-6">
                    <a href="/about" className="text-white hover:text-gray-300">博客</a>
                </li>
                <li className="mr-6">
                    <a href="/services" className="text-white hover:text-gray-300">关于我</a>
                </li>
                <li className="mr-6">
                    <a href="/contact" className="text-white hover:text-gray-300">商业合作</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
