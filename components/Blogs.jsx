import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Blogs = ({ posts }) => {
  const router = useRouter(); // Call the useRouter hook to get the router object



    return (
        <>
            <div className="container mx-auto px-4">
                <div className="font-bold text-3xl text-gray-900 my-6">最近更新</div>
                <div className="grid md:grid-cols-2 gap-6">
                    {posts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <Link href={post.urlSlug} legacyBehavior>
                                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                

                                    <img src={post.picUrl} alt={post.title} className="w-full h-48 object-cover" />

                                    {/* <div className="relative w-full h-48">
                                        <Image
                                            src={post.picUrl} // Use dynamic source from your post object
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover" // This will cover the area of the container similar to 'object-cover' in Tailwind CSS
                                            className="w-full h-full" // Ensure the image fills the container
                                        />
                                    </div> */}
                                    <div className="p-6">

                                        <h2 className="group-hover:text-blue-600 text-lg leading-tight font-semibold text-gray-900 mt-2">{post.title}</h2>
                                        <p className="text-gray-600 mt-2">{post.description}</p>
                                        <div className="text-gray-500 text-sm mt-2"> {new Date(post.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Blogs;
