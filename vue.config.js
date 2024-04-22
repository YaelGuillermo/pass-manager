const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'tailwindcss',
    'autoprefixer',
  ],
})
