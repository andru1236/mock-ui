import { APIS, UI } from './actionTypes';
import { IStoreState } from "./domain/IStoreState";
import { IAction } from "./domain/IAction";
import { IApiInstance } from "../domain/IApiInstance";

const initialSelectedApi: IApiInstance = {
    _id: "",
    name: "",
    port: 0,
    routes: [],
    settings: {
        enabled: false,
        createdOn: '',
    }

};

const AppInitState: IStoreState = {
    apis: [],
    selectedApi: initialSelectedApi,
    ui: {
        showCreateApiModal: false,
        showApiRoutesModal: false,
        showUpdateApiModal: false,
        showRemoveApiModal: false
    }
};

export default function app(state: IStoreState = AppInitState, action: IAction): IStoreState {
    switch (action.type) {
        case APIS.LOAD:
            if (action.payload === undefined) {
                return {
                    ...state,
                    apis: []
                }
            }
            return {
                ...state,
                apis: action.payload
            };
        case APIS.LOAD_API:
            return {
                ...state,
                selectedApi: action.payload
            }
        case APIS.SELECT_API:
            return {
                ...state,
                selectedApi: action.payload
            };
        case APIS.DESELECT_API:
            return {
                ...state,
                selectedApi: action.payload
            };
        case UI.OPEN_CREATE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showCreateApiModal: action.payload }
            };
        case UI.CLOSE_CREATE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showCreateApiModal: action.payload }
            };
        case UI.OPEN_UPDATE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showUpdateApiModal: action.payload }
            };
        case UI.CLOSE_UPDATE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showUpdateApiModal: action.payload }
            };
        case UI.OPEN_REMOVE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showRemoveApiModal: action.payload }
            };

        case UI.CLOSE_REMOVE_API_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showRemoveApiModal: action.payload }
            };
        case UI.OPEN_API_ROUTES_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showApiRoutesModal: action.payload }
            };
        case UI.CLOSE_API_ROUTES_MODAL:
            return {
                ...state,
                ui: { ...state.ui, showApiRoutesModal: action.payload }
            };

        default:
            return state;
    }
}
