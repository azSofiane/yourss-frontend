const path = require('path')

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.join(__dirname, 'components'),
      '@pages': path.join(__dirname, 'pages'),
      '@reducers': path.join(__dirname, 'reducers'),
      '@styles': path.join(__dirname, 'styles'),
      '@img': path.join(__dirname, 'public/img')
    }

    return config
  }
}
