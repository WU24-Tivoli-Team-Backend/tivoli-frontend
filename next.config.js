/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lkuqmcsvgzuoldsa.public.blob.vercel-storage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    styledComponents: true,
  }
}

module.exports = nextConfig