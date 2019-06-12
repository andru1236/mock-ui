import {IApiInstance} from "../../domain/IApiInstance";

export interface IStoreState {
  apis: IApiInstance[]
  apiSelected: IApiInstance | {};
  ui: {
    showCreateApiModal: boolean
    showApiRoutesModal: boolean
    showUpdateApiModal: boolean
    showRemoveApiModal: boolean
  }
}