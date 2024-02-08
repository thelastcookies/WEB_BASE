import type {Preset, Rule, UserShortcuts, Variant} from 'unocss';

// 规则
const rules: Rule<Object>[] = [
    ['flex', {display: 'flex', 'align-items': 'center', 'justify-content': 'flex-start'}],
    ['flex-sb', {'justify-content': 'space-between'}],
    ['flex-sa', {'justify-content': 'space-around'}],
    ['flex-se', {'justify-content': 'space-evenly'}],
    ['pointer', {},],
    [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d) / 4}rem`})],
    [/^p-(\d+)$/, match => ({padding: `${Number(match[1]) / 4}rem`})]
];

// 快捷方式
const shortcuts: UserShortcuts = [
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
