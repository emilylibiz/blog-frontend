import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_PAGE_SIZE } from '../utils/constants'; 
import { useRouter } from 'next/router';

const Blogs = ({ initialPosts, initialPage, totalPages }) => {
    const router = useRouter();
    // Get the page from URL or use the initial page
    const pageFromUrl = parseInt(router.query.page) || initialPage;

    // Ensure initialPosts are sliced correctly for the initial state
    const initialSubset = initialPosts.slice(0, BLOG_PAGE_SIZE);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(pageFromUrl);

    useEffect(() => {
        const startIndex = (page - 1) * BLOG_PAGE_SIZE;
        const endIndex = startIndex + BLOG_PAGE_SIZE;
        setPosts(initialPosts.slice(startIndex, endIndex));
    }, [page, initialPosts]);


    const handlePagination = (newPage) => {
        setPage(newPage);
        router.push(`/?page=${newPage}`, undefined, { shallow: true });
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handlePagination(i)}>
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="font-bold text-3xl text-gray-900 my-6">最近更新</div>
            <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, i) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
                        <Link href={`/${post.urlSlug}`} legacyBehavior>
                            <a>
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.picUrl || '/default-image.jpg'}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={75}
                                        priority={i < 2}
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="group-hover:text-blue-600 text-lg leading-tight font-semibold text-gray-900 mt-2">{post.title}</h2>
                                    <p className="text-gray-600 mt-2">{post.description}</p>
                                    <div className="text-gray-500 text-sm mt-2">{new Date(post.createdAt).toLocaleDateString()}</div>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                {renderPagination()}
            </div>
        </div>
    );
};

export default Blogs;
