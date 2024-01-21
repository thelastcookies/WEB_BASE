export interface DataModel {
    id?: string;
    modelName: string;
    modelAlias: string;
    modelState?: number;
    comment?: string;
}

export interface DataModelField {
    fieldName: string;
    fieldAlias: string;
    fieldType: string;
    fieldLength?: number;
    fieldDecimals?: number;
    isPrimaryKey?: boolean;
    isUnique?: boolean;
    isAutoIncrement?: boolean;
    referencedDataModel?: string;
    referencedField?: string;

    notNull: boolean;
    fieldDict: string;

    queryConditions: string;
    orderBy: string;
}
