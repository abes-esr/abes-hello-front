module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: 'localhost',
    port: 8888,
  },

}