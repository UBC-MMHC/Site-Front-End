import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "developers.google.com",
                pathname: "/identity/images/**",
            },
        ],
    },
    async rewrites() {
        const backendUrl = process.env.NEXT_PUBLIC_BASE_URL_API || "http://localhost:8080";
        return [
            {
                source: "/api/:path*",
                destination: `${backendUrl}/api/:path*`,
            },
            {
                source: "/oauth2/:path*",
                destination: `${backendUrl}/oauth2/:path*`,
            },
        ];
    },
};

export default nextConfig;
