/** @type {import('next').Config} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        swr: 'swr/dist/index.mjs',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
