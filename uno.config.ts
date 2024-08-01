import { presetUno } from '@unocss/preset-uno'
import { defineConfig } from '@unocss/vite'
import { presetAnimations } from 'unocss-preset-animations'
import {
  // builtinColors,
  presetShadcn,
} from 'unocss-preset-shadcn'

/** @see {@link https://github.com/hyoban/unocss-preset-shadcn#usage} */
export default defineConfig({
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
  presets: [
    presetUno(),
    presetAnimations(),
    presetShadcn(),
    // presetShadcn(builtinColors.map(c => ({ color: c }))),
  ],
})
