import {IApiInstance} from "../../domain/IApiInstance";

export interface IStoreState {
  apis: IApiInstance[]
  currentApi: IApiInstance | {};
  ui: {
    showCreateApiModal: boolean
    showApiRoutesModal: boolean
    showUpdateApiModal: boolean
    showRemoveApiModal: boolean
  }
}