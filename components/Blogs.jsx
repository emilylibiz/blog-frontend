// Other imports might be necessary depending on your setup
import Image from 'next/image';
import Link from 'next/link';

const Blogs = ({ posts }) => {
    return (
        <div className="container mx-auto px-4">
            <div className="font-bold text-3xl text-gray-900 my-6">最近更新</div>
            <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer">
                        <Link href={`/${post.urlSlug}`} legacyBehavior>
                            <a>
                                <div className="relative h-48 w-full">
                                    
                                    <Image
                                        src={post.picUrl}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={75} // Adjust quality as needed
                                        priority={i < 2} // Assuming you might want to prioritize the first two images
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
        </div>
    );
};

export default Blogs;
