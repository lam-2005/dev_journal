import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Cho phép tất cả các đường dẫn từ Cloudinary
      },
    ],
  },
};

export default nextConfig;
