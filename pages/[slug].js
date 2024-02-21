import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react'
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from '../graphql/queries';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GRAPHQL_API_URL } from '../utils/urls';

const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
});

export default function Post({ post }) {
    return (
      <div className="container mx-auto flex flex-wrap py-6">
        {/* Main content */}
        <div className="w-full lg:w-2/3 flex flex-col items-start px-3">
          <div className="flex flex-col w-full mt-8">
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            <h1 className="text-4xl text-black font-bold leading-none lg:leading-snug mb-2">{post.title}</h1>
            <p className="text-md text-gray-800 mt-2">
            <div className="prose">
                <MDXRemote {...post.content} />
            </div>
            </p>
          </div>
        </div>
  
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl text-gray-800 font-bold border-b pb-2">I Am John Doe</p>
            <p className="text-sm text-gray-600 mt-2">
              Etiam placerat velit vitae dui blandit sollicitudin. Sheed dolor sit Nullam egestas sem at mollis sodales...
            </p>
            {/* ... rest of the sidebar content */}
          </div>
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl text-gray-800 font-bold border-b pb-2">Popular Posts</p>
            {/* ... list of popular posts */}
          </div>
        </div>
      </div>
    );
  }

export async function getStaticPaths() {

    const { data } = await client.query({ query: GET_ALL_SLUGS });

    const paths = data.blogPosts.data.map((post) => {
        return { params: { slug: post.attributes.urlSlug } }
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: GET_INDIVIDUAL_POST,
        variables: { slugUrl: params.slug }
    });

    const attrs = data.blogPosts.data[0].attributes;

    const html = await serialize(convertContentToMarkdown(attrs.content));
    return {
        props: {
            post: {
                title: attrs.title,
                createdAt: attrs.createdAt,
                content: html
            }
        }
    }
}


function convertContentToMarkdown(blocks) {
    return blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return block.children.map(child => child.text).join('');
        case 'list':
          if (block.format === 'unordered') {
            return block.children.map(item => `* ${item.children.map(child => child.text).join('')}`).join('\n');
          } else {
            // For ordered lists
            return block.children.map((item, index) => `${index + 1}. ${item.children.map(child => child.text).join('')}`).join('\n');
          }
        // Add cases for other types of blocks if necessary
        default:
          return '';
      }
    }).join('\n\n');
  }
  