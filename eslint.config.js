import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu({
  formatters: true,
  typescript: true,
  unocss: true,
  vue: true,
}, {
  rules: {
    'vue/attributes-order': 'off',
  },
}).append(ii({ functional: false }))
