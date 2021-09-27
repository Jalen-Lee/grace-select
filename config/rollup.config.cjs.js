import rollupConfig from './rollup.config'

export default rollupConfig({
  output: {
    file: 'lib/selected.cjs.js',
    format: 'cjs',
    exports: 'auto'
  },
  browser: false
})