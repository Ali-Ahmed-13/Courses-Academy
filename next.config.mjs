/** @type {import('next').Config} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        swr: 'swr/dist/index.mjs',
      },
    },
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },
};

export default nextConfig;
