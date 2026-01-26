/** @type {import('next').Config} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        swr: 'swr/dist/index.mjs',
      },
    },
  },
  
};

export default nextConfig;
