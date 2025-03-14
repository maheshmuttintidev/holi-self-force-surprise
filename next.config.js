/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      // Add patterns here if you need to load external images
    ],
  },
};

module.exports = nextConfig;