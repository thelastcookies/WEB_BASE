// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss';
import presetThelastcookies from "./preset";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      }
    }),
    presetTypography(),
    presetThelastcookies(),
  ],
  safelist: [
    'i-mdi-pencil',
    'i-mdi-format-list-bulleted',
    'i-mdi-numeric',
    'i-mdi-star-check',
    'i-mdi-radiobox-marked',
    'i-mdi-checkbox-marked-outline',
    'i-mdi-calendar',
    'i-mdi-calendar-clock',
    'i-mdi-account-check',
    'i-mdi-lan',
    'i-mdi-star',
    'i-mdi-eye',
    'i-mdi-heart',
    'i-mdi-trophy',
    'i-mdi-thumb-up'
  ]
});
