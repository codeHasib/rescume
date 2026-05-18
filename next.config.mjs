/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wpcdn.web.wsu.edu",
        pathname: "/**",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
