import rollupConfig from './rollup.config'

export default rollupConfig({
  output: {
    file: 'lib/selection.browser.cjs.js',
    format: 'cjs',
    exports: 'auto'
  },
  browser: true
})
