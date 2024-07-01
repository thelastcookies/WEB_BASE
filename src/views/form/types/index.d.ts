export interface ComponentGroup {
    name: string;
    components: ComponentConfig[];
}

export interface ComponentConfig {
    name: string;
    type: string;
    icon: string;
    props: ComponentProps;
}

export type ComponentProps =
    BaseConfigProps
    | TextInputConfigProps
    | TextareaInputConfigProps
    | NumberInputConfigProps
    | ScoreConfigProps
    | PickerConfigProps
    | TimePickerConfigProps
    | EntityPickerConfigProps
    | TableListConfigProps
    | SpanLayoutConfigProps;

export interface SpanLayoutConfigProps {
    isContainer: boolean;
    span: number;
    number: number
    gutter: number;
    columns: any[];
}

interface BaseConfigProps {
    required: boolean;
}

export interface TextInputConfigProps extends BaseConfigProps {
}

export interface TextareaInputConfigProps extends BaseConfigProps {
    max: number;
}

export interface NumberInputConfigProps extends BaseConfigProps {
}

export interface ScoreConfigProps extends BaseConfigProps {
    color: string;
    max: number;
    showScore: boolean;
    enableHalf: boolean;
    icon: string;
}

export interface PickerConfigProps extends BaseConfigProps {
    expanding: boolean;
    options: string[];
}

export interface TimePickerConfigProps extends BaseConfigProps {
    placeholder: string | string[];
    format: string;
    showLength: boolean;
}

export interface EntityPickerConfigProps extends BaseConfigProps {
    multiple: boolean;
}

export interface TableListConfigProps extends BaseConfigProps {
    showBorder: boolean;
    showSummary: boolean;
    summaryColumns: any[];
    maxSize: number;
    columns: any[];
}

