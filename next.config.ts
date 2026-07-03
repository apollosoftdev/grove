import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the MySQL driver out of the server bundle so it loads natively at runtime.
  serverExternalPackages: ["@prisma/adapter-mariadb", "mariadb"],
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000', // Matches your MinIO API port
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
