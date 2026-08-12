import type { NextConfig } from 'next';

// GitHub Pages project-site path: https://zamora16.github.io/angel-zamora-portfolio/
const REPO_NAME = 'angel-zamora-portfolio';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${REPO_NAME}`,
  assetPrefix: `/${REPO_NAME}/`,
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Static export has no image-optimization server (GitHub Pages is static hosting).
    unoptimized: true,
  },
  // This is to allow cross-origin requests from the development environment.
  allowedDevOrigins: ['**'],
};

export default nextConfig;
