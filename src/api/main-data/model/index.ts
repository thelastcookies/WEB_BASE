import type {DataModel} from "@/api/main-data/model/types.d.ts";

export const getDataModelList = () => {
    return useGet<DataModel[]>(
        `${BASE_URL}/model`,
        null,
        {
            mock: true,
        }
    );
}

export const getDataModelById = (id: string) => {
    return useGet<DataModel, string>(
        `${BASE_URL}/model/${id}`,
        '', {
            mock: true
        }
    );
}

export const addDataModel = (params: DataModel) => {
    return usePost<null, DataModel>(
        `${BASE_URL}/model`,
        params, {
            mock: true,
        }
    );
}

export const updDataModel = (params: DataModel) => {
    return usePut<null, DataModel>(
        `${BASE_URL}/model`,
        params
    );
}

export const delDataModel = (id: string) => {
    return useDelete<null, string>(
        `${BASE_URL}/model/${id}`
    );
}
