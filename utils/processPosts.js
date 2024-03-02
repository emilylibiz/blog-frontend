import { BACKEND_URL } from './urls';

export const processedPosts = (data) => {
  if (!data ) {
    return [];
  }

  // Extracting the picture URL and other necessary data
  const processedPosts = data.map(post => ({
    title: post.attributes.title,
    description: post.attributes.description,
    urlSlug: post.attributes.urlSlug,
    tags: post.attributes.tags,
    picUrl: BACKEND_URL + post.attributes.pic?.data?.attributes?.url,
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
