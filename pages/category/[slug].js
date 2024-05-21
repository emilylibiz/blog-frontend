
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { GET_POSTS_BY_TAG, GET_ALL_TAGS } from '../../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../../utils/urls';
import Blogs from '../../components/Blogs';
import { processedPosts } from '../../utils/processPosts';
import { categoryMapping, BLOG_PAGE_SIZE } from '../../utils/constants';

const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
});


export default function Categories({ data , tag, initialPosts,
    initialPage,
    totalPages, }) {
    return (

            <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 my-10">
            <div className="w-full border-b border-gray-300 mb-6">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
                {categoryMapping[tag]}
                </h1>
                <p className='my-5'>点击阅读所有{categoryMapping[tag]}相关博文</p>
            </div>

            <Blogs initialPosts={initialPosts} initialPage={initialPage} totalPages={totalPages} />
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

//Todo: fix lazy implementatin that have all posts , add real pagination for that 
export async function getStaticProps({ params, preview = false }) {
    const { data } = await client.query({
        query: GET_POSTS_BY_TAG,
        variables: { tag: params.slug, page: 1, pageSize: 100 }
    });

    // Ensure the tags and blog_posts data exists
    if (data.tags.data.length === 0 || !data.tags.data[0].attributes.blog_posts) {
        return {
            props: {
                tag: params.slug,
                initialPosts: [],
                initialPage: 1,
                totalPages: 0,
            },
            revalidate: 1,  // Consider adding revalidate to enable ISR if applicable
        };
    }

    const tagData = data.tags.data[0].attributes.blog_posts;
    const posts = processedPosts(tagData.data);
    const initialPosts = posts; 
    const initialPage = data.tags.meta.pagination.page;
    const totalPages = data.tags.meta.pagination.pageCount;

    return {
        props: {
            tag: params.slug, 
            initialPosts,
            initialPage,
            totalPages,
        },
        revalidate: 1  // Revalidate prop for Incremental Static Regeneration if using Next.js
    };
}
