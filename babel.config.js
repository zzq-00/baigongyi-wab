const plugins = []
if (process.env.NODE_ENV === 'production') {
  // plugins.push(['transform-remove-console', { 'exclude': ['error', 'warn'] }]);
  plugins.push('transform-remove-console');
}
module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset'
  // ]
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: plugins
}
