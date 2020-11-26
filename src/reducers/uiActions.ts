import { UI } from './actionTypes';
import {IAction} from "../domain/reducer";

export const isOpenTrue = (): IAction => {
  return {
    type: UI.IS_OPEN_TRUE,
    payload: true
  }
}

export const isSecondOpenTrue = (): IAction => {
  return {
    type: UI.IS_SECOND_OPEN_TRUE,
    payload: true
  }
}

export const isOpenFalse = (): IAction => {
  return {
    type: UI.IS_OPEN_TRUE,
    payload: false
  }
}

export const isSecondOpenFalse = (): IAction => {
  return {
    type: UI.IS_SECOND_OPEN_TRUE,
    payload: false
  }
}

export function openCreateApiModal(): IAction {
  return {
    type: UI.OPEN_CREATE_API_MODAL,
    payload: true
  }
}

export function closeCreateApiModal(): IAction {
  return {
    type: UI.CLOSE_CREATE_API_MODAL,
    payload: false
  }
}

export function openUpdateApiModal(): IAction {
  return {
    type: UI.OPEN_UPDATE_API_MODAL,
    payload: true
  }
}

export function closeUpdateApiModal(): IAction {
  return {
    type: UI.CLOSE_UPDATE_API_MODAL,
    payload: false
  }
}

export function openRemoveApiModal(): IAction {
  return {
    type: UI.OPEN_REMOVE_API_MODAL,
    payload: true
  }
}

export function closeRemoveApiModal(): IAction {
  return {
    type: UI.CLOSE_REMOVE_API_MODAL,
    payload: false
  }
}

export function openApiRoutesModal(): IAction {
  return {
    type: UI.OPEN_API_ROUTES_MODAL,
    payload: true
  }
}

export function closeApiRoutesModal(): IAction {
  return {
    type: UI.CLOSE_API_ROUTES_MODAL,
    payload: false
  }
}
