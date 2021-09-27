import rollupConfig from './rollup.config'

export default rollupConfig({
  output: {
    file: 'lib/selection.browser.es.js',
    format: 'iife',
    exports: 'auto'
  },
  browser: true
})