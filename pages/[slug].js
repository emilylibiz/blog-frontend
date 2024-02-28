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
      <div className="container mx-auto flex flex-wrap py-6">
       {/* Main content */}
        <div className="w-full lg:w-2/3 flex flex-col items-start px-3">
          <div className="flex flex-col w-full mt-8">
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            <h1 className="text-4xl text-black font-bold leading-none lg:leading-snug mb-2">{post.title}</h1>
            <div className="prose">
                <MDXRemote {...post.content} />
            </div>
          </div>
        </div>
  
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 flex flex-col items-center px-3">
          <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl text-gray-800 font-bold border-b pb-2">关于我</p>
            <p className="text-sm text-gray-600 mt-2">
            嗨，欢迎来到我的博客！我叫Emily，是一个身兼数职的普通妈妈，既是孩子们依赖的妈咪，又是科技大厂写代码的软件工程师，更是自己小企业的掌舵人。我的生活就像一部多角色剧，每一天都在不同的角色间切换，迎接着新的挑战与机遇。
            </p>
            <Link href="/aboutme" className="text-sm  text-blue-600 hover:underline mt-4">了解更多</Link>
          </div>
          {/* <div className="w-full bg-white shadow flex flex-col my-4 p-6">
            <p className="text-xl text-gray-800 font-bold border-b pb-2">推荐阅读</p>
          </div> */}
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
        case 'image' :
          const imageUrl = block.image.formats.small.url.startsWith('http')
            ? block.image.formats.small.url
            : BACKEND_URL + block.image.formats.small.url;
          const altText = block.image.alternativeText || 'image';
          return `![${altText}](${imageUrl})`;
          // return <img src={imageUrl} alt={altText} />;
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
  