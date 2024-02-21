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

// const GET_ALL_POSTS = gql`
// query {
//     blogPosts {
//       data {
//         attributes {
//           title
//           description
//           urlSlug
//         }
//       }
//     }
//   }
// `;

 const GET_ALL_POSTS = gql`
    query GetAllPosts {
        blogPosts {
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
        }
      }
    }
  }
`;



export { GET_ALL_POSTS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS };