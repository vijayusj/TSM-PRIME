/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['image.tmdb.org', 'img.youtube.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

// export default withPlaiceholder(nextConfig);
