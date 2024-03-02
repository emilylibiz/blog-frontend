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
                    tags {
                      data {
                        attributes {
                          tagName
                        }
                      }
                    }
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


const GET_POSTS_BY_TAG = gql`
query GetPostsByTag($tag: String!) {
  tags(filters: { tagName: { eq: $tag } }) {
    data {
      attributes {
        tagName
        blog_posts {
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
              tags {
                data {
                  attributes {
                    tagName
                  }
                }
              }
            }
          }
        }
      }
  }
  }
}
`;

const GET_ALL_TAGS = gql`
  query {
    tags {
      data {
        attributes {
          tagName
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;




export { GET_ALL_POSTS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS, GET_POSTS_BY_TAG, GET_ALL_TAGS };