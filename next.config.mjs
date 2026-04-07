/** @type {import('next').Config} */
const nextConfig = {
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
