import type {NextConfig} from 'next';

// When deploying to GitHub Pages the app is served from a sub-path
// (e.g. https://<user>.github.io/dharmicviews). Set NEXT_PUBLIC_BASE_PATH
// to the repo name in CI; leave it empty for local dev / custom-domain deploys.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Static export for GitHub Pages.
  output: 'export',
  // Sub-path used by GitHub Pages (e.g. /dharmicviews).
  basePath,
  assetPrefix: basePath,
  // next/image doesn't support its built-in optimiser in static export mode.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['motion'],
};

export default nextConfig;
