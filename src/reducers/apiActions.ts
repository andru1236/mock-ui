import {APIS} from "./actionTypes";
import {IAction} from "./domain/IAction";
import {IApiInstance} from "../domain/IApiInstance";

export function load(apis: IApiInstance[]): IAction {
  return {
    type: APIS.LOAD,
    payload: apis
  }
}