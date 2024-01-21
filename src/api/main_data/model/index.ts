import {baseUrl} from "@/api/url.ts";
import {DataModel} from "@/api/main_data/model/types.ts";

export const getDataModelList = () => {
    return useGet<DataModel[]>(
        `${baseUrl}/model`,
        null, {
            mock: true,
        }
    );
}

export const getDataModelById = (id: string) => {
    return useGet<DataModel, string>(
        `${baseUrl}/model/${id}`
    );
}

export const addDataModel = (params: DataModel) => {
    return usePost<null, DataModel>(
        `${baseUrl}/model`,
        params
    );
}

export const putDataModel = (params: DataModel) => {
    return usePut<null, DataModel>(
        `${baseUrl}/model`,
        params
    );
}

export const delDataModel = (id: string) => {
    return useDelete<null, string>(
        `${baseUrl}/model/${id}`
    );
}
