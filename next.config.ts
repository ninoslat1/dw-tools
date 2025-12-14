import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['sqlocal'],
  
  // webpack: (config, { isServer }) => {
  //   config.experiments = {
  //     ...config.experiments,
  //     asyncWebAssembly: true,
  //     layers: true,
  //   };

  //   config.module.rules.push({
  //     test: /\.wasm$/,
  //     type: 'asset/resource',
  //   });

  //   // Prevent server-side bundling
  //   if (isServer) {
  //     config.resolve = config.resolve || {};
  //     config.resolve.alias = {
  //       ...config.resolve.alias,
  //       sqlocal: false,
  //     };
  //   }

  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     fs: false,
  //     path: false,
  //   };

  //   return config;
  // },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp"
          }
        ]
      }
    ]
  }
};

export default nextConfig;