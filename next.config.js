/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["ffmpeg-static"],
  },
  reactStrictMode: true,
  env: {
    FLUENTFFMPEG_COV: false,
  },
  images: {
    domains: ["i.ytimg.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
