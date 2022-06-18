/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/listing',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
