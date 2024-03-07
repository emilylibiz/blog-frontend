/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'http', hostname: '127.0.0.1', port: '1337' },
      { protocol: 'https', hostname: 'emily-blog-f50378d01564.herokuapp.com' },
    ],
  },
}

module.exports = nextConfig;
