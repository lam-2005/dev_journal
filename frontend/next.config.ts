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
  async rewrites() {
    return [
      {
        // Khi bạn gọi /api/abc ở Frontend
        source: "/api/:path*",
        // Nó sẽ tự hiểu là gọi đến Render
        destination: "https://dev-journal-7nn4.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
