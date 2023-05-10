/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/signin',
                permanent: true
            },
            {
                source: '/dashboard',
                destination: '/dashboard/companies',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
