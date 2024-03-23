/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['emily-blog-s3-images-bucket.s3.us-west-2.amazonaws.com']
  },
}

module.exports = nextConfig;
