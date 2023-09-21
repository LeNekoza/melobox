/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FLUENTFFMPEG_COV: false,
  },
  images: {
    domains: ["i.ytimg.com"],
  },
};

module.exports = nextConfig;
