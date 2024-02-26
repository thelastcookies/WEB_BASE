import type {Preset, Rule, UserShortcuts, Variant} from 'unocss';

// 规则
const rules: Rule<Object>[] = [
    [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d) / 4}rem`})],
    [/^p-(\d+)$/, match => ({padding: `${Number(match[1]) / 4}rem`})],
];

// 快捷方式
const shortcuts: UserShortcuts = [
    ['flex', 'flex flex-items-center flex-justify-start'],
    ['flex-c', 'flex flex-items-center flex-justify-center'],
    ['flex-sb', 'flex flex-items-center flex-justify-between'],
    ['flex-sa', 'flex flex-items-center flex-justify-around'],
    ['flex-se', 'flex flex-items-center flex-justify-evenly'],
    ['image-bg', 'bg-no-repeat bg-contain bg-center'],
];

// 主题
const theme: Object = {};

// 变体
const variants: Variant<Object>[] = [];

// 组合预设并导出
export default function presetThelastcookies(): Preset {
    return {
        name: 'preset-thelastcookies',
        rules,
        shortcuts,
        theme,
        variants,
    }
}
