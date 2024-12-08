/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["emily-blog-s3-images-bucket.s3.us-west-2.amazonaws.com"],
  },
  env: {
    SITEMAP_URL:
      process.env.NODE_ENV === "production"
        ? "https://emily-blog-backend-eedb993a47c4.herokuapp.com/api/sitemap/index.xml"
        : "http://localhost:1337/api/sitemap/index.xml",
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
