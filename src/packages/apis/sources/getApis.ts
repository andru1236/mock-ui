import { apiServiceRest } from "../../../services";
import { IApiInstance } from "../../../domain/api";

export const getApis = async () => await apiServiceRest.getApis();

export const getOneApi = async (apiId: string) => await apiServiceRest.getApi(apiId);

export const createApi = async (newApi: IApiInstance) => await apiServiceRest.postApis(newApi);

export const updateApi = async (api: IApiInstance) => await apiServiceRest.putApi(api);

export const deleteApi = async (apiId: string) => await apiServiceRest.deleteApi(apiId);

