import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_API_URL } from '../utils/urls';
import { GET_ALL_POSTS } from '../graphql/queries';
import { BLOG_PAGE_SIZE } from '../utils/constants'; 

const Blogs = ({ initialPosts, initialPage, totalPages }) => {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async (page) => {
        setLoading(true);
        const client = new ApolloClient({
            uri: GRAPHQL_API_URL,
            cache: new InMemoryCache()
        });

        try {
            const { data, errors } = await client.query({
                query: GET_ALL_POSTS,
                variables: { page: page, pageSize: BLOG_PAGE_SIZE }
            });

            if (errors) {
                console.error("GraphQL errors: ", errors);
                setLoading(false);
                return;
            }

            const newPosts = processedPosts(data);
            setPosts(newPosts);
            setPage(page);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts: ", error);
            setLoading(false);
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => fetchPosts(i)}
                    disabled={loading}>
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

const processedPosts = (data) => {
  if (!data || !data.blogPosts || !data.blogPosts.data) {
    return [];
  }

  const processedPosts = data.blogPosts.data.map(post => ({
    id: post.id,
    title: post.attributes.title,
    description: post.attributes.description,
    urlSlug: post.attributes.urlSlug,
    picUrl: post.attributes.pic?.data?.attributes?.url,
    createdAt: post.attributes.createdAt
  }));

  processedPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // for descending order
  });
  return processedPosts;
};

export default Blogs;
