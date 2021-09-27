import rollupConfig from './rollup.config.js'

export default rollupConfig({
  output: {
    file: 'lib/selected.browser.cjs.js',
    format: 'cjs',
    exports: 'auto'
  },
  browser: true
})


