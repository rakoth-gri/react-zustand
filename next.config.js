const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles'), path.join(__dirname, 'src', 'components')],
  },
}

module.exports = nextConfig
