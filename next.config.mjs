/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  // ضيف دي عشان نكست 16 يعدي الـ Build بسلام
  experimental: {
    turbopack: {},
  },
};

export default nextConfig;