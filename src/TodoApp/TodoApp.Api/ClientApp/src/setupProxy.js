const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend-dotnetapi:5028',
      changeOrigin: true,
    }),
  );
};
