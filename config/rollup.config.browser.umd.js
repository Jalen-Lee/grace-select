import rollupConfig from './rollup.config'

export default rollupConfig({
  output: {
    file: 'lib/selection.browser.umd.js',
    format: 'umd',
    name:'selection'
  },
  browser: true
})