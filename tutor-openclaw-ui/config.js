window.AQUARIUS_CONFIG = Object.assign({}, window.AQUARIUS_CONFIG, {
  apiBase: ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)
    ? ''
    : 'https://aquarius-5ss0.onrender.com'
});
