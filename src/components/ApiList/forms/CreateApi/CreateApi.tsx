import * as React from "react";
import {toast} from 'react-semantic-toasts';
import {apiService} from "../../../../services";
// Actions
import * as UIActions from '../../../../reducers/uiActions';
import * as ApiActions from '../../../../reducers/apiActions';
// AddRouteForm
import CreateApiForm from './CreateApiForm';
import {connect} from "react-redux";
import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";
import {HandlerError} from "../../../utils/HandlerError";

interface IContainerProps {
    createApiModal: boolean;
    actions: {
        ui: {
            closeCreateApiModal(): void;
        },
        apis: {
            load(apis: IApiInstance[]): void
        }

    }
}

interface IContainerState {
    name: string;
    port: number;
}


class CreateApi extends React.Component<IContainerProps, IContainerState> {

    constructor(props: IContainerProps) {
        super(props);
        this.state = {
            name: '',
            port: 0
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerPort = this.handlerPort.bind(this);
        this.createApi = this.createApi.bind(this);
        this.guardClause = this.guardClause.bind(this);
        this.cleanFields = this.cleanFields.bind(this);
    }

    handlerName(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    handlerPort(event: any) {
        this.setState({
            port: parseInt(event.target.value)
        })
    }

    cleanFields() {
        this.setState({name: '', port: 0})
    }

    guardClause() {
        if (this.state.name === '' && this.state.port === 0) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error on fields',
                description: `name should be a strings and port should be a number`,
                animation: 'bounce',
                time: 5000,
            });
            return false;
        }
        return true;
    }

    createApi() {
        if (this.guardClause()) {
            const {name, port} = this.state;
            const newApiInstance: IApiInstance = {
                name: name,
                port: port
            };
            apiService.postApis(newApiInstance)
                .then(() => {
                    this.props.actions.ui.closeCreateApiModal();
                    apiService.getApis()
                        .then((response: any) => {
                            this.props.actions.apis.load(response.data.data.apis);
                            this.cleanFields();
                        })
                        .catch((error: any) => {
                            console.log(error.response);
                        });
                })
                .catch((error: any) => {
                    HandlerError.handler(error);
                });
        }
    }

    render() {
        return (
            <CreateApiForm
                isOpenModal={this.props.createApiModal}
                closeForm={this.props.actions.ui.closeCreateApiModal}
                handleName={this.handlerName}
                handlePort={this.handlerPort}
                createApi={this.createApi}
            />
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        createApiModal: state.ui.showCreateApiModal
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            ui: {
                closeCreateApiModal: () => {
                    dispatch(UIActions.closeCreateApiModal())
                }
            },
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApiActions.load(apis))
                }
            }

        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateApi);