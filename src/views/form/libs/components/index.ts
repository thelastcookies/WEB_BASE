import type { Component } from "vue";
import type { BaseConfigProps, ComponentGroup } from "@/views/form/types";

const Components = import.meta.glob('./components/*.vue');
export const FormComponents = (() => {
    let formComponents: Record<string, Component> = {};
    Object.keys(Components).forEach((key) => {
        const name = key.replace(/^.+\/([^/]+)\.vue$/, '$1');
        formComponents[name] = Components[key];
    });
    return formComponents;
})();

export const componentGroups: ComponentGroup[] = [
    {
        name: '基础组件',
        components: [
            {
                name: '单行输入框',
                type: 'TextInput',
                icon: 'EditOutlined',
            },
            {
                name: '多行输入框',
                type: 'TextareaInput',
                icon: 'UnorderedListOutlined',
            },
            {
                name: '数字输入框',
                type: 'NumberInput',
                icon: 'FieldNumberOutlined',
            },
            {
                name: '评分',
                type: 'Score',
                icon: 'StarOutlined',
            },
            {
                name: '单选框',
                type: 'SinglePicker',
                icon: 'AimOutlined',
            },
            {
                name: '多选框',
                type: 'MultiplePicker',
                icon: 'AppstoreAddOutlined',
            },
            {
                name: '日期时间点',
                type: 'DateTimePicker',
                icon: 'CalendarOutlined',
            },
            {
                name: '日期时间区间',
                type: 'DateTimeRangePicker',
                icon: 'CarryOutOutlined',
            },
            {
                name: '人员选择',
                type: 'UserPicker',
                icon: 'TeamOutlined',
            },
            {
                name: '部门选择',
                type: 'DeptPicker',
                icon: 'ApartmentOutlined',
            },
        ],
    },
    {
        name: '布局组件',
        components: [
            {
                name: '分栏布局',
                type: 'SpanLayout',
                icon: 'BorderInnerOutlined',
            },
        ],
    },
    {
        name: '高级组件',
        components: [
            {
                name: '明细表',
                type: 'TableList',
                icon: 'TableOutlined',
            },
        ],
    },
];

export const ComponentCommonPropsDefault: BaseConfigProps = {
    required: false,
    size: undefined,
    mode: "view",
    placeholder: "",
};
