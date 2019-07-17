let webpackConfig
module.exports = env => {
  switch (env.NODE_ENV) {
    case 'prod':
    case 'production': {
      webpackConfig = require('./build/webpack.prod.conf')
      break
    }
    case 'dev':
    case 'development':
    default: {
      webpackConfig = require('./build/webpack.dev.conf')
    }
  }
  return webpackConfig
} 