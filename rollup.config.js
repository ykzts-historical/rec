import copy from 'rollup-plugin-copy-assets'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: ['src/background.ts', 'src/script.ts'],
  output: {
    dir: 'dist/chrome',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    typescript({
      clean: true
    }),
    copy({
      assets: ['src/images', 'src/manifest.json']
    })
  ]
}
