/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["utfs.io"]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
