module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: 'localhost',
    port: 8888,
  },

}