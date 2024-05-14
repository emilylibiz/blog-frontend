import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../utils/urls';
import Blogs from '../components/Blogs';
import WelcomeBanner from '../components/WelcomeBanner';
import { BLOG_PAGE_SIZE } from '../utils/constants'; 

export default function Home({ initialPosts, initialPage, totalPages  }) {
  return (
    <div>
      <WelcomeBanner />
      <Blogs initialPosts={initialPosts} initialPage={initialPage} totalPages={totalPages}  />
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
  });



  const { data, errors } = await client.query({
    query: GET_ALL_POSTS,
    variables: { page: 1, pageSize: BLOG_PAGE_SIZE } // Set the initial page and page size
  });

  const initialPosts = processedPosts(data);
  const initialPage = data.blogPosts.meta.pagination.page;
  const totalPages = data.blogPosts.meta.pagination.pageCount;

  return {
    props: {
      initialPosts,
      initialPage,
      totalPages,
    }
  }
}


const processedPosts = (data) => {
  if (!data || !data.blogPosts || !data.blogPosts.data) {
    return [];
  }

  // Extracting the picture URL and other necessary data
  const processedPosts = data.blogPosts.data.map(post => ({
    title: post.attributes.title,
    description: post.attributes.description,
    urlSlug: post.attributes.urlSlug,
    picUrl: post.attributes.pic?.data?.attributes?.url,
    createdAt: post.attributes.createdAt
  }));

  // Sorting posts by the latest first
  // Assuming you have a 'createdAt' or similar field to determine the post's age
  // If you don't have this field, you'll need to adjust the sorting logic
  processedPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // for descending order
  });
  return processedPosts;
};