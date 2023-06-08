const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
      ["/user/","/product/","/order/","/delivery/","/checkout/"],
      createProxyMiddleware({
        target: "https://backenddecommerce.onrender.com",
        changeOrigin: true,
      })
    );
};