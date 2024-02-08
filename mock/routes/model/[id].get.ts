import type {DataModel} from "../../../src/api/main-data/model/types";
import {BaseResponseBody} from "../../../src/api/main-data";

export default eventHandler((event): BaseResponseBody<DataModel> => {
    const id = getRouterParam(event, 'id');
    const data: DataModel = {
        id: "10000001",
        modelName: "ORG_STR",
        modelAlias: "组织架构",
        modelState: 0,
        comment: "",
    };
    return {
        code: 200,
        msg: '获取成功',
        data,
    }
});
