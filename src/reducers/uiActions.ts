import {UI} from './actionTypes';
import {IAction} from "./domain/IAction";

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
