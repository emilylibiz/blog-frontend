import { gql } from '@apollo/client';

const GET_ALL_SLUGS = gql`
query {
    blogPosts {
      data {
        attributes {
          urlSlug
        }
      }
    }
  }
`;


 const GET_ALL_POSTS = gql`
    query GetAllPosts {
        blogPosts {
            data {
                attributes {
                    title
                    description
                    urlSlug
                    createdAt
                    category
                    pic {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                    content
                }
            }
        }
    }
`;


const GET_INDIVIDUAL_POST = gql`
query ($slugUrl: String!) {
    blogPosts(filters: { urlSlug: { eq: $slugUrl } }) {
      data {
        attributes {
          title
          content
          createdAt
          category
        }
      }
    }
  }
`;


const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($category: String!) {
    blogPosts(filters: { category: { eq: $category } }) {
      data {
        attributes {
          title
          description
          urlSlug
          createdAt
          pic {
            data {
              attributes {
                url
              }
            }
          }
          content
          category
        }
      }
    }
  }
`;



export { GET_ALL_POSTS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS, GET_POSTS_BY_CATEGORY };