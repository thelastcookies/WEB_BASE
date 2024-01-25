export interface DataModel {
    id?: string;
    modelName: string;
    modelAlias: string;
    modelState?: number;
    comment?: string;
}

export interface DataModelField {
    id: string;
    fieldName: string;
    fieldAlias: string;
    fieldType: string;
    fieldLength?: number;
    fieldDecimals?: number;
    isPrimaryKey?: boolean;
    isUnique?: boolean;
    isAutoIncrement?: boolean;
    isNotNull: boolean;
    fieldDict: string;
    referencedDataModel?: string;
    referencedField?: string;
}
