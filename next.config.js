/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['bs-uploads.toptal.io'],
    },
};

module.exports = nextConfig;
