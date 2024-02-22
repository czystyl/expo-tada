// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

console.log(111, require.resolve('readable-stream'));
console.log(333, require.resolve('stream/web'));

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'stream/web': require.resolve('readable-stream'),
  stream: require.resolve('readable-stream'),
};

module.exports = config;
