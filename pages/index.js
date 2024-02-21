import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client'
import { GET_ALL_POSTS } from '../graphql/queries';
import { GRAPHQL_API_URL, BACKEND_URL } from '../utils/urls';
import Blogs from '../components/Blogs';
import WelcomeBanner from '../components/WelcomeBanner';

export default function Home({ posts }) {
  // console.log("------------------API_URL =" , API_URL);
  // console.log("-------------------posts = ", JSON.stringify(posts));
  return (
    <div>
      <WelcomeBanner />
      <Blogs posts={posts} />
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
  });



  const { data } = await client.query({
    query: GET_ALL_POSTS
  })

  const posts = processedPosts(data);
  // console.log("---------  -posts : ", JSON.stringify(posts));

  return {
    props: {
      posts: posts
    }
  }
}

// const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const processedPosts = (data) => {
  if (!data || !data.blogPosts || !data.blogPosts.data) {
    return [];
  }

  // Extracting the picture URL and other necessary data
  const processedPosts = data.blogPosts.data.map(post => ({
    title: post.attributes.title,
    description: post.attributes.description,
    urlSlug: post.attributes.urlSlug,
    picUrl: BACKEND_URL + post.attributes.pic?.data?.attributes?.url,
    // content: post.attributes.content,
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