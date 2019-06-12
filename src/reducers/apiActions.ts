import {APIS} from "./actionTypes";
import {IAction} from "./domain/IAction";
import {IApiInstance} from "../domain/IApiInstance";

export function load(apis: IApiInstance[]): IAction {
    return {
        type: APIS.LOAD,
        payload: apis
    }
}


export function selectApi(api: IApiInstance): IAction {
    return {
        type: APIS.SELECT_API,
        payload: api
    }
}

export function deselectAPI(): IAction {
    return {
        type: APIS.DESELECT_API,
        payload: {}
    }
}