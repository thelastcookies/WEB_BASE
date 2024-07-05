import type { AsyncComponentLoader, Component } from "vue";
import type {
    BaseConfigProps, ComponentGroup, NumberInputConfigProps, PickerConfigProps,
    ScoreConfigProps, TextareaInputConfigProps, TextInputConfigProps, TimePickerConfigProps
} from "@/views/form/types";

const Components = import.meta.glob('./*.vue');
export const FormComponents = (() => {
    let formComponents: Record<string, Component> = {};
    Object.keys(Components).forEach((key) => {
        const name = key.replace(/^.+\/F([^/]+)\.vue$/, '$1');
        formComponents[name] = defineAsyncComponent(Components[key] as AsyncComponentLoader);
    });
    return formComponents;
})();

export const componentCommonPropsDefault: BaseConfigProps = {
    required: false,
    size: undefined,
    placeholder: "",
};

export const textInputConfigPropsDefault: TextInputConfigProps = {
    ...componentCommonPropsDefault,
}

export const textareaInputConfigPropsDefault: TextareaInputConfigProps = {
    ...componentCommonPropsDefault,
    max: 255,
}

export const numberInputConfigPropsDefault: NumberInputConfigProps = {
    ...componentCommonPropsDefault,
    max: Infinity,
    min: -Infinity,
}

export const scoreConfigPropsDefault: ScoreConfigProps = {
    ...componentCommonPropsDefault,
    color: '#F0A732',
    max: 5,
    // 尚未实现
    showScore: true,
    enableHalf: false,
    icon: 'StarFilled',
}

export const singlePickerConfigPropsDefault: PickerConfigProps = {
    ...componentCommonPropsDefault,
    expanding: false,
    options: ['选项1', '选项2'],
}

export const multiplePickerConfigPropsDefault: PickerConfigProps = {
    ...componentCommonPropsDefault,
    expanding: false,
    options: ['选项1', '选项2'],
}

export const dateTimePickerConfigPropsDefault: TimePickerConfigProps = {
    ...componentCommonPropsDefault,
    format: 'YYYY-MM-DD',
    showLength: false,
    placeholder: '请选择时间',
}

export const dateTimeRangePickerConfigPropsDefault: TimePickerConfigProps = {
    ...componentCommonPropsDefault,
    format: 'YYYY-MM-DD',
    showLength: false,
    placeholder: '开始时间,结束时间',
}

// TODO: 更多表单组件
export const componentGroups: ComponentGroup[] = [
    {
        name: '基础组件',
        components: [
            {
                name: '单行输入框',
                type: 'TextInput',
                icon: 'EditOutlined',
                props: textInputConfigPropsDefault,
            },
            {
                name: '多行输入框',
                type: 'TextareaInput',
                icon: 'UnorderedListOutlined',
                props: textareaInputConfigPropsDefault,
            },
            {
                name: '数字输入框',
                type: 'NumberInput',
                icon: 'FieldNumberOutlined',
                props: numberInputConfigPropsDefault,
            },
            {
                name: '评分',
                type: 'Score',
                icon: 'StarOutlined',
                props: scoreConfigPropsDefault,
            },
            {
                name: '单选框',
                type: 'SinglePicker',
                icon: 'AimOutlined',
                props: singlePickerConfigPropsDefault,
            },
            {
                name: '多选框',
                type: 'MultiplePicker',
                icon: 'AppstoreAddOutlined',
                props: multiplePickerConfigPropsDefault,
            },
            {
                name: '时间选择',
                type: 'DateTimePicker',
                icon: 'CalendarOutlined',
                props: dateTimePickerConfigPropsDefault,
            },
            {
                name: '时间区间选择',
                type: 'DateTimeRangePicker',
                icon: 'CarryOutOutlined',
                props: dateTimeRangePickerConfigPropsDefault,
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
