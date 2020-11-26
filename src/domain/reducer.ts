import { IApiInstance } from "./api";

export interface IAction {
  type: string;
  payload: any;
}

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