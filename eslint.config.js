import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
}, {
  rules: {
    'antfu/top-level-function': 'off'
  }
})
