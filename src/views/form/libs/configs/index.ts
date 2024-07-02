import type { Component } from "vue";

const Configs = import.meta.glob('./configs/*.vue');

export const FormComponentConfigs = (() => {
    let formComponentConfigs: Record<string, Component> = {};
    Object.keys(Configs).forEach((key) => {
        const name = key.replace(/^.+\/([^/]+)\.vue$/, '$1');
        formComponentConfigs[name] = Configs[key];
    });
    return formComponentConfigs;
})();
