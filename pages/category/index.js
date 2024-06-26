// import Container from 'components/Container';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';
// import readingTime from 'reading-time';
import Image from 'next/image';
import { GET_All_CATEGORIES, GET_ALL_TAGS } from '../../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../../utils/urls';
import { categoryMapping } from '../../utils/constants';

const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache(),
});

export default function Code({ tags }) {
    return (
        <div className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-16 my-10 px-10">
            <div className="w-full border-b border-gray-300 mb-6">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
                    博客分类
                </h1>
                <p className='my-5'>点击阅读相应文章</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {tags.map((val, i) => (
                    <Link key={i} legacyBehavior={true} href={'category/' + val.attributes.tagName}>
                    <a className="block p-4 items-center justify-center hover:bg-slate-100 rounded-md transition-colors duration-150">
                        <div className="relative">
                            <Image
                                src={`/${val.attributes.tagName}.jpg`}
                                width={672} // Consider making this dynamic or responsive if necessary
                                height={250} // Ensure these dimensions are suitable for your design
                                alt="image"
                                className="rounded-md !bg-white !border-solid !border-1 !hide:border-gray-200"
                            />
                        </div>
                        <div className="font-bold text-gray-900 my-6">
                            {categoryMapping[val.attributes.tagName]}
                        </div>
                    </a>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const { data } = await client.query({
        query: GET_ALL_TAGS
    });

    return {
        props: {
            tags: data.tags.data
        }
    };
}
