import Link from 'next/link';
import Image from 'next/image';


const Blogs = ({ posts }) => {
    return (
      <>
        <div className="container mx-auto px-4">
        <div className="font-bold text-3xl text-gray-900 my-6">最近更新</div>
        <div className="grid md:grid-cols-2 gap-6">
        {posts.map((post, i) => (
                <Link key={i} href={post.urlSlug} legacyBehavior>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={post.picUrl} alt={post.title} className="w-full h-48 object-cover" />
                        {/* <Image
                          src={post.picUrl} // Make sure this is an absolute URL if the image is external
                          alt={post.title}
                          width={full} // Provide specific dimensions or use layout='fill'
                          height={48} // Provide specific dimensions or use layout='fill'
                          objectFit="cover"
                          layout="responsive" // This can be 'fixed', 'intrinsic', 'responsive', or 'fill'
                        /> */}
                        <div className="p-6">
                            {/* <div className="uppercase tracking-wide text-xs font-semibold bg-gray-200 text-gray-700 rounded-full px-3 py-1 inline-block">{post.category}</div> */}
                            <h2 className="group-hover:text-blue-600 text-lg leading-tight font-semibold text-gray-900 mt-2">{post.title}</h2>
                            <p className="text-gray-600 mt-2">{post.description}</p>
                            <div className="text-gray-500 text-sm mt-2"> {new Date(post.createdAt).toLocaleDateString()}</div>
                        </div>
                    </div>
                </Link>
                ))}
        </div>
        </div>
      </>
    );
  };

  
export default Blogs;


