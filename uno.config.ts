import { defineConfig } from '@unocss/vite'
import { presetUno } from '@unocss/preset-uno'
import { presetAnimations } from 'unocss-preset-animations'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

/** @see {@link https://github.com/hyoban/unocss-preset-shadcn#usage} */
export default defineConfig({
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn(builtinColors.map(c => ({ color: c }))),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    },
  },
})
