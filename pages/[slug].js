import { ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST, GET_ALL_SLUGS_AND_TITLES } from "../graphql/queries";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { GRAPHQL_API_URL, BACKEND_URL } from "../utils/urls";
import Link from "next/link";
import Image from "next/image";
import Seo from "../components/seo";

const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export default function Post({ post, previousPost, nextPost }) {

  const seo = {
    metaTitle: post.title,
    metaDescription: post.description,
    shareImage: post.image,
    article: true,
  };
 

  return (
    <div className="container mx-auto flex flex-wrap pt-8 px-8 lg:px-0">
      <Seo seo={seo} />
      {/* Main Content */}
      <div className="w-full lg:w-3/4 px-4 lg:pr-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-4">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="prose lg:prose-lg max-w-none pb-16">
          <MDXRemote {...post.content} />
        </div>

        {/* Previous and Next Blog Links */}
        <div className="flex justify-between mt-8 pb-12">
          {previousPost && (
            <Link href={`/${previousPost.urlSlug}`} legacyBehavior>
              <a className="text-blue-500 hover:text-blue-700">
                ← {previousPost.title}
              </a>
            </Link>
          )}
          {nextPost && (
            <Link href={`/${nextPost.urlSlug}`} legacyBehavior>
              <a className="text-blue-500 hover:text-blue-700">
              {nextPost.title} →
              </a>
            </Link>
          )}
        </div>

      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/4 lg:pl-4">
        <div className="sticky top-20 p-6 bg-white shadow-lg rounded-lg bg-gray-300 p-4 rounded-lg shadow-inner">
          <div className="text-center mb-6 ">
            <Image
              src="/Emily.png"
              alt="Emily"
              width={128} // Corresponds to the desired width in pixels
              height={128} // Corresponds to the desired height in pixels
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">Hi! I&apos;m Emily!</h2>
            <p className="text-gray-600 text-sm ">欢迎来到我的博客</p>
          </div>
          <p className="text-gray-700 mb-4">
            我是一个身兼数职的普通妈妈：
            既是自己小企业的掌舵人，又是科技大厂写代码的软件工程师，还是孩子们依赖的妈咪，每一天都在不同的角色间切换，迎接着新的挑战与机遇。
          </p>
          <div className="flex justify-center">
            <Link
              href="/aboutme"
              className="text-sm inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-base"
            >
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
        start: (page - 1) * 10, // assuming the default limit is 10
        limit: 10,
      },
    });

    slugs = slugs.concat(
      data.blogPosts.data.map((post) => ({
        params: { slug: post.attributes.urlSlug },
      }))
    );
    // console.log("---------------------blog slugs = ", slugs)
    totalPages = Math.ceil(data.blogPosts.meta.pagination.total / 10); // Adjust based on actual meta data
    page++;
  } while (page <= totalPages);

  return {
    paths: slugs,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_INDIVIDUAL_POST,
    variables: { slugUrl: params.slug },
  });
  // console.log("---------------------blog data = ", data)
  const attrs = data.blogPosts.data[0].attributes;
  const mdxSource = await serialize(attrs.content);

    // Fetch all posts to determine previous and next posts
    const { data: allPostsData } = await client.query({
      query: GET_ALL_SLUGS_AND_TITLES,
      variables: {
        start: 0,
        limit: 1000, // Fetch all posts (adjust based on your total number of posts)
      },
    });
  
    const allPosts = allPostsData.blogPosts.data;
    const currentIndex = allPosts.findIndex(
      (post) => post.attributes.urlSlug === params.slug
    );
  
    const previousPost =
      currentIndex > 0 ? allPosts[currentIndex - 1].attributes : null;
    const nextPost =
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1].attributes : null;

      
  return {
    props: {
      post: {
        title: attrs.title,
        createdAt: attrs.createdAt,
        content: mdxSource,
      },
      previousPost,
      nextPost,
    },
  };
}

