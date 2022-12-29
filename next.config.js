const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  images: {
    domains: ['s3-us-west-2.amazonaws.com', 'drive.littleson.com.br', 'host.littleson.com.br']
  },
  env: {
    API_KEY_LYKET: process.env.API_KEY_LYKET,
  }
})