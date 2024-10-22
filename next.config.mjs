/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
    },
    webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        return config
    },
    images:{
        remotePatterns:[{
            protocol:'https',
            hostname:'lh3.googleusercontent.com'
        }]
    }
};

export default nextConfig;
