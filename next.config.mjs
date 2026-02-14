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
  webpack: (config, options) => {
    config.resolve.modules.push(path.join(__dirname, 'app'));
    return config;
  },
};

export default nextConfig;
