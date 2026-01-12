/** @type {import('next').Config} */
const nextConfig = {
  transpilePackages: ['@clerk/nextjs', '@clerk/shared'],
  experimental: {
    turbo: {
      resolveAlias: {
        swr: 'swr/dist/index.mjs',
      },
    },
  },
};

export default nextConfig;
