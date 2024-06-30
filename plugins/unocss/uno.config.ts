// uno.config.ts
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss';
import presetThelastcookies from "./preset";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetThelastcookies(),
    ],
});
