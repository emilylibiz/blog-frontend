import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react'
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from '../graphql/queries';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { GRAPHQL_API_URL , BACKEND_URL} from '../utils/urls';
import Link from 'next/link';

const client = new ApolloClient({
    uri: GRAPHQL_API_URL,
    cache: new InMemoryCache()
});


export default function Post({ post }) {
  return (
    <div className="container mx-auto flex flex-wrap pt-8 px-16 lg:px-0">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 px-4 lg:pr-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
        <div className="prose lg:prose-lg max-w-none pb-16">
          <MDXRemote {...post.content} />
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 lg:pl-4">
        <div className="sticky top-20 p-6 bg-white shadow-lg rounded-lg bg-gray-100 p-4 rounded-lg shadow-inner">
          <div className="text-center mb-6 ">
            <img src="/emily.png" alt="Jaden" className="rounded-full w-32 h-32 mx-auto mb-4"/>
            <h2 className="text-xl font-semibold">Hi! I'm Emily!</h2>
            <p className="text-gray-600 text-sm ">欢迎来到我的博客</p>
          </div>
          <p className="text-gray-700 mb-4">
            我是一个身兼数职的普通妈妈： 既是自己小企业的掌舵人，又是科技大厂写代码的软件工程师，还是孩子们依赖的妈咪，每一天都在不同的角色间切换，迎接着新的挑战与机遇。 
          </p>
          <div className="flex justify-center">
              <Link href="/aboutme" className="text-sm inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base">
                  了解更多
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

  export async function getStaticPaths() {
    let slugs = [];
    let page = 1;
    let totalPages = 1;
  
    do {
      const { data } = await client.query({
        query: GET_ALL_SLUGS,
        variables: {
          start: (page - 1) * 10,  // assuming the default limit is 10
          limit: 10
        }
      });
      
      slugs = slugs.concat(data.blogPosts.data.map(post => ({
        params: { slug: post.attributes.urlSlug }
      })));
  
      totalPages = Math.ceil(data.blogPosts.meta.pagination.total / 10); // Adjust based on actual meta data
      page++;
    } while (page <= totalPages);
  
    return {
      paths: slugs,
      fallback: false
    };
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
                content: html,
            }
        }
    }
}

  function convertContentToMarkdown(blocks) {
    // Function to process text and nested elements like links
    const processTextElements = (elements) => {
        return elements.map(element => {
            if (element.type === 'text') {
                return element.text;
            } else if (element.type === 'link') {
              const linkText = element.children.map(child => child.text).join('');
              // Format it as a markdown link
              return `[${linkText}](${element.url})`;
            }
            return ''; // Return an empty string for unsupported types
        }).join('');
    };

    return blocks.map(block => {
        switch (block.type) {
            case 'paragraph':
                return processTextElements(block.children);
            case 'image':
                const imageUrl = block.image.url.startsWith('http')
                    ? block.image.url
                    : BACKEND_URL + block.image.url;
                const altText = block.image.alternativeText || 'image';
                return `![${altText}](${imageUrl})`;
            case 'list':
                if (block.format === 'unordered') {
                    return block.children.map(item => `* ${processTextElements(item.children)}`).join('\n');
                } else {
                    // For ordered lists
                    return block.children.map((item, index) => `${index + 1}. ${processTextElements(item.children)}`).join('\n');
                }
            default:
                return ''; // Handle other types similarly if needed
        }
    }).join('\n\n');
}
