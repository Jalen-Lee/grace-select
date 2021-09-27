import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginJson from '@rollup/plugin-json'
import pluginCommonjs from 'rollup-plugin-commonjs'
import pluginBabel from '@rollup/plugin-babel'
import path from 'path'

const env = process.env.NODE_ENV

function isProduction(){
  return env === 'production'
}

export default function(config){
  const defaultConfig = {
    input: './src/selection.js',
    external: [], // 告诉rollup，哪些库不打包，将其视为外部链接
    Plugins: [ //插件
      pluginNodeResolve(),
      pluginJson(),
      pluginCommonjs(),
      pluginBabel({
        exclude: /node_modules/
      })
    ],
  }
  return Object.assign(defaultConfig,config)
}