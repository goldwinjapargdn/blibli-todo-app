const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const noMock = process.env.NODE_ENV !== 'development' || process.env.NOMOCK === 'true'

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@api-mock': noMock ? resolve('src/empty') : resolve('src/api/mock'),
        'axios-mock-adapter': noMock ? resolve('src/empty') : 'axios-mock-adapter/dist/axios-mock-adapter.min.js'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
