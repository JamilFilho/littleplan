const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 'drive.littleson.com.br', 'host.littleson.com.br']
  }
})