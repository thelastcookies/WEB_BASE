import type {DataModel} from "../../../src/api/main-data/model/types";
import type {BaseResponseBody} from "../../../src/api/main-data";

export default eventHandler(async (event): Promise<BaseResponseBody<DataModel>> => {
    const body = await readBody(event);
    console.log(body);
    // const id = getRouterParam(event, 'id');
    // const data: DataModel = {
    //
    // };
    return {
        code: 200,
        msg: '获取成功',
        // data,
    }
});
