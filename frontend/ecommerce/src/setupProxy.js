const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
      ["/user/","/product/","/order/","/delivery/"],
      createProxyMiddleware({
        target: "https://backenddecommerce.onrender.com",
        changeOrigin: true,
      })
    );
};