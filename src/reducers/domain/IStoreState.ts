import {IApiInstance} from "../../domain/IApiInstance";

export interface IStoreState {
  apis: IApiInstance[]
  selectedApi: IApiInstance | {};
  ui: {
    showCreateApiModal: boolean
    showApiRoutesModal: boolean
    showUpdateApiModal: boolean
    showRemoveApiModal: boolean
    isOpen: boolean
    isSecondOpen: boolean
  }
}