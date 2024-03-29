
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_POSTS_BY_TAG, GET_ALL_TAGS } from '../../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../../utils/urls';
import Blogs from '../../components/Blogs';
import { processedPosts } from '../../utils/processPosts';
import { categoryMapping } from '../../utils/copy';

const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
});


export default function Categories({ tag, posts }) {
    return (

            <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 my-10">
            <div className="w-full border-b border-gray-300 mb-6">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
                {categoryMapping[tag]}
                </h1>
                <p className='my-5'>点击阅读所有{categoryMapping[tag]}相关博文</p>
            </div>

            <Blogs posts={posts} />
        </div>
    );
}
export async function getStaticPaths() {
    const { data } = await client.query({ query: GET_ALL_TAGS });
    const paths = data.tags.data.map((tag) => {
        return { params: { slug: tag.attributes.tagName } };
    });
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params, preview = false }) {
    const { data } = await client.query({
        query: GET_POSTS_BY_TAG,
        variables: { tag: params.slug }
    });
    const posts = processedPosts(data.tags.data[0].attributes.blog_posts.data);

    return {
        props: {
            tag: params.slug, 
            posts: posts,
        }
    };
}
