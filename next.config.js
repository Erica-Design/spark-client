/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [
      "spark-media.s3.ap-northeast-2.amazonaws.com",
      "via.placeholder.com"
    ],
  }
}

module.exports = nextConfig
