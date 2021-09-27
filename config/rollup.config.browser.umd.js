import rollupConfig from './rollup.config'

export default rollupConfig({
  output: {
    file: 'lib/selected.browser.umd.js',
    format: 'umd',
    name:'selected'
  },
  browser: true
})