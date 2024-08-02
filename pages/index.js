import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../utils/urls';
import Blogs from '../components/Blogs';
import WelcomeBanner from '../components/WelcomeBanner';
import { BLOG_PAGE_SIZE } from '../utils/constants'; 
import Seo from '../components/seo';

export default function Home({ initialPosts, initialPage, totalPages  }) {
  // console.log("----initialPosts =" , initialPosts); 
  return (
    <div>
      <Seo/> 
      <WelcomeBanner />
      <Blogs initialPosts={initialPosts} initialPage={initialPage} totalPages={totalPages}  />
    </div>
  )
}


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache(),
  });

  try {
    // Initial fetch to determine the number of pages
    let { data } = await client.query({
      query: GET_ALL_POSTS,
      variables: { page: 1, pageSize: BLOG_PAGE_SIZE }
    });

    if (!data || !data.blogPosts) {
      throw new Error('Failed to fetch posts.');
    }

    // Calculate total number of pages needed to fetch all posts
    const totalPages = data.blogPosts.meta.pagination.pageCount;
    let allPosts = data.blogPosts.data;

    // Fetch all pages
    for (let page = 2; page <= totalPages; page++) {
      const { data } = await client.query({
        query: GET_ALL_POSTS,
        variables: { page, pageSize: BLOG_PAGE_SIZE }
      });
      allPosts = allPosts.concat(data.blogPosts.data);
    }

    // Process and sort posts
    const initialPosts = processedPosts(allPosts);
    const initialPage = 1; // Starting from the first page

    return {
      props: {
        initialPosts,
        initialPage,
        totalPages,
      },
      revalidate: 10 // Optionally, revalidate at a fixed interval (in seconds)
    };
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return {
      props: {
        initialPosts: [],
        initialPage: 1,
        totalPages: 1,
      },
      revalidate: 10
    };
  }
}


const processedPosts = (postsArray) => {
  if (!postsArray) {
    return [];
  }

  // Map posts to your required format and sort
  const processed = postsArray.map(post => ({
    title: post.attributes.title,
    description: post.attributes.description,
    urlSlug: post.attributes.urlSlug,
    picUrl: post.attributes.pic?.data?.attributes?.url,
    createdAt: post.attributes.createdAt
  })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return processed;
};