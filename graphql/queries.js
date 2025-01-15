import { gql } from "@apollo/client";

const GET_ALL_SLUGS = gql`
  query GetAllSlugs($start: Int, $limit: Int) {
    blogPosts(pagination: { start: $start, limit: $limit }) {
      data {
        attributes {
          urlSlug
        }
      }
      meta {
        pagination {
          total
          pageSize
          pageCount
          page
        }
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts($page: Int, $pageSize: Int) {
    blogPosts(pagination: { page: $page, pageSize: $pageSize }) {
      data {
        id
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
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
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
  query GetPostsByTag($tag: String!, $page: Int!, $pageSize: Int!) {
    tags(filters: { tagName: { eq: $tag } }) {
      data {
        attributes {
          tagName
          blog_posts(pagination: { page: $page, pageSize: $pageSize }) {
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
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
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
        }
      }
    }
  }
`;

export {
  GET_ALL_POSTS,
  GET_INDIVIDUAL_POST,
  GET_ALL_SLUGS,
  GET_POSTS_BY_TAG,
  GET_ALL_TAGS,
};
