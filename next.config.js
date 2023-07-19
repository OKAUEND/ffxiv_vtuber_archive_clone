/** @type {import('next').NextConfig} */
const urlPrefix = process.env.URL_PREFIX ? '/' + process.env.URL_PREFIX : '';

const nextConfig = {
  reactStrictMode: true,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
  images: {
    domains: ['yt3.ggpht.com'],
  },
};

module.exports = nextConfig;
