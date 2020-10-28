import React from "react";
import {connect} from "react-redux";
import {toast} from 'react-semantic-toasts';
// Domain
import {IApiInstance} from "../../../domain/IApiInstance";
import {IStoreState} from "../../../reducers/domain/IStoreState";
// Redux actions
import * as ApiActions from '../../../reducers/apiActions';
import * as UIActions from '../../../reducers/uiActions';
// Services
import {apiService} from "../../../services";
// Views
import BodyApiList from "./BodyApiList";
import { withRouter } from "react-router-dom";


interface IContainerProps {
    apis: IApiInstance[];
    selectedApi: IApiInstance;
    history: any;
    actions: {
        apis: {
            load(apis: IApiInstance[]): void;
            selectApi(api: IApiInstance): void;
        };
        ui: {
            openApiRoutesModal(): void;
            openUpdateApiModal(): void;
            openRemoveApiModal(): void;
        }

    };
}

class BodyApiListContainer extends React.Component<IContainerProps, any> {


    constructor(props: IContainerProps) {
        super(props);
        this.openApiRoutesModal = this.openApiRoutesModal.bind(this);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.openRemoveModal = this.openRemoveModal.bind(this);
        this.startOrStopApi = this.startOrStopApi.bind(this);
    }

    private selectApi(apiId: string) {
        const selectedApi = this.props.apis.find((api) => api._id === apiId);
        this.props.actions.apis.selectApi(selectedApi);
    }

    private reloadApis() {
        apiService.getApis()
            .then((response: any) => {
                this.props.actions.apis.load(response.data.data.apis)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    openApiRoutesModal(apiId: string) {
        this.selectApi(apiId);
        this.props.history.push(`/apis/${apiId}/routes`)
    }

    openUpdateModal(apiId: string) {
        this.selectApi(apiId);
        this.props.actions.ui.openUpdateApiModal();
    }

    openRemoveModal(apiId: string) {
        this.selectApi(apiId);
        this.props.actions.ui.openRemoveApiModal();
    }

    startOrStopApi(data: any, apiId: string, port: number) {
        if (data.checked) {
            apiService.startApi(apiId)
                .then(() => {
                    toast({
                        type: 'success',
                        icon: 'bullhorn',
                        title: 'Launch Api instance',
                        description: `Exist new api that is executing on port ${port}`,
                        animation: 'bounce',
                        time: 5000,
                    });
                    this.reloadApis();
                })
                .catch((error) => {
                    if (error.response.data.custom) {
                        const data = error.response.data.custom;
                        toast({
                            type: 'error',
                            icon: 'bullhorn',
                            title: 'Error with launch api instance',
                            description: `Error: ${data.errorName} ${data.message}`,
                            animation: 'bounce',
                            time: 5000,
                        })
                    }
                });
        } else {
            apiService.stopApi(apiId)
                .then(() => {
                    toast({
                        type: 'warning',
                        icon: 'bullhorn',
                        title: 'Stop api instance',
                        description: `The api instance with port ${port} was stopped`,
                        animation: 'bounce',
                        time: 5000,
                    });
                    this.reloadApis();
                })
                .catch((error) => {
                    if (error.response.data.custom) {
                        const data = error.response.data.custom;
                        toast({
                            type: 'error',
                            icon: 'bullhorn',
                            title: 'Error when stopping api instance',
                            description: `Error: ${data.errorName} ${data.message}`,
                            animation: 'bounce',
                            time: 5000,
                        })
                    }
                });
        }

    }

    componentDidMount() {
        apiService.getApis()
            .then((response: any) => {
                this.props.actions.apis.load(response.data.data.apis)
            })
            .catch((error: any) => {
                toast({
                    type: 'error',
                    icon: 'bullhorn',
                    title: 'Service unavailable',
                    description: `problem with get apis`,
                    animation: 'bounce',
                    time: 5000,
                });
            })
    }

    render() {
        return (
            <BodyApiList
                apis={this.props.apis}
                openApiRoutesModal={this.openApiRoutesModal}
                openUpdateModal={this.openUpdateModal}
                openRemoveModal={this.openRemoveModal}
                startOrStopApi={this.startOrStopApi}
            />
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        apis: state.apis,
        selectedApi: state.selectedApi
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApiActions.load(apis))
                },
                selectApi: (api: IApiInstance) => {
                    dispatch(ApiActions.selectApi(api))
                }
            },
            ui: {
                openApiRoutesModal: () => {
                    dispatch(UIActions.openApiRoutesModal())
                },
                openUpdateApiModal: () => {
                    dispatch(UIActions.openUpdateApiModal())
                },
                openRemoveApiModal: () => {
                    dispatch(UIActions.openRemoveApiModal())
                }
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BodyApiListContainer));