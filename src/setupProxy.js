// frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/auth', '/trainings', '/profile'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false,
    })
  );
};
