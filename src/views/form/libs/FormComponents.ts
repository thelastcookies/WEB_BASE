import type { ComponentGroup } from "@/views/form/types";
import { Component } from "vue";

const Components = import.meta.glob('./components/*.vue');
const Configs = import.meta.glob('./configs/*.vue');

const getFormComponents = () => {
    let formComponents: Record<string, Component> = {};
    Object.keys(Components).forEach((key) => {
        const name = key.replace(/^.+\/([^/]+)\.vue$/, '$1');
        formComponents[name] = Components[key];
    });
    return formComponents;
};
export const FormComponents = getFormComponents();

const getComponentConfigs = () => {
    let formComponentConfigs: Record<string, Component> = {};
    Object.keys(Configs).forEach((key) => {
        const name = key.replace(/^.+\/([^/]+)\.vue$/, '$1');
        formComponentConfigs[name] = Components[key];
    });
    return formComponentConfigs;
};
export const FormComponentConfigs= getComponentConfigs();

export const componentGroups: ComponentGroup[] = [
    {
        name: '基础组件',
        components: [
            {
                name: '单行输入框',
                type: 'TextInput',
                icon: 'EditOutlined',
                props: {
                    required: false,
                },
            },
            {
                name: '多行输入框',
                type: 'TextareaInput',
                icon: 'UnorderedListOutlined',
                props: {
                    required: false,
                    max: 255,
                },
            },
            {
                name: '数字输入框',
                type: 'NumberInput',
                icon: 'FieldNumberOutlined',
                props: {
                    required: false,
                },
            },
            {
                name: '评分',
                type: 'Score',
                icon: 'StarOutlined',
                props: {
                    required: false,
                    color: '#F0A732',
                    max: 5,
                    showScore: true,
                    enableHalf: false,
                    icon: 'Star',
                },
            },
            {
                name: '单选框',
                type: 'SinglePicker',
                icon: 'AimOutlined',
                props: {
                    required: false,
                    expanding: false,
                    options: ['选项1', '选项2'],
                },
            },
            {
                name: '多选框',
                type: 'MultiplePicker',
                icon: 'AppstoreAddOutlined',
                props: {
                    required: false,
                    expanding: false,
                    options: ['选项1', '选项2'],
                },
            },
            {
                name: '日期时间点',
                type: 'DateTimePicker',
                icon: 'CalendarOutlined',
                props: {
                    required: false,
                    format: 'YYYY-MM-DD HH:mm',
                },
            },
            {
                name: '日期时间区间',
                type: 'DateTimeRangePicker',
                icon: 'CarryOutOutlined',
                props: {
                    required: false,
                    placeholder: ['开始时间', '结束时间'],
                    format: 'YYYY-MM-DD HH:mm',
                    showLength: false,
                },
            },
            {
                name: '人员选择',
                type: 'UserPicker',
                icon: 'TeamOutlined',
                props: {
                    required: false,
                    multiple: false,
                },
            },
            {
                name: '部门选择',
                type: 'DeptPicker',
                icon: 'ApartmentOutlined',
                props: {
                    required: false,
                    multiple: false,
                },
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
                props: {
                    isContainer: true,
                    span: 24,
                    number: 2,
                    gutter: 5,
                    columns: [],
                },
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
                props: {
                    required: false,
                    showBorder: true,
                    showSummary: false,
                    summaryColumns: [],
                    maxSize: 0, //最大条数，为0则不限制
                    columns: [], //列设置
                },
            },
        ],
    },
];
