const runtimeCaching = require("next-pwa/cache")

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/app',
    sw: 'service-worker.js',
    buildExcludes: [/middleware-manifest.json$/]
  },
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 'drive.littleson.com.br', 'host.littleson.com.br']
  },
  env: {
    API_KEY_LYKET: process.env.API_KEY_LYKET,
  }
})