// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

  return config;
})();
