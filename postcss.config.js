module.exports = {
  plugins: {
    autoprefixer: {
      grid: true,
    },
    'postcss-nested': {},
    'postcss-custom-properties': {
      preserve: true,
      importFrom: 'site/css/properties.css',
    },
  },
}
