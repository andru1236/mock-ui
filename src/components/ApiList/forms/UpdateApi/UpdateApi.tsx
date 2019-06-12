import * as React from 'react';

import * as UIActions from '../../../../reducers/uiActions';
import * as ApisActions from '../../../../reducers/apiActions';

import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";
import {connect} from "react-redux";
import UpdateApiForm from "./UpdateApiForm";
import {apiService} from "../../../../services";

interface IContainerProps {
    selectedApi: IApiInstance;
    updateApiModal: boolean;
    actions: {
        ui: {
            closeUpdateApiModal(): void;
        }
        apis: {
            load(apis: IApiInstance[]): void;
        }
    };
}

interface IContainerState {
    name: string;
    port: number;
}

class UpdateApi extends React.Component<IContainerProps, IContainerState> {

    constructor(props: IContainerProps) {
        super(props);
        this.state = {
            name: this.props.selectedApi.name,
            port: this.props.selectedApi.port
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerPort = this.handlerPort.bind(this);
        this.updateApi = this.updateApi.bind(this);
    }

    componentWillReceiveProps(newProps: IContainerProps) {
        if (newProps.selectedApi.name !== this.state.name && newProps.selectedApi.port !== this.state.port) {
            this.setState({
                name: newProps.selectedApi.name,
                port: newProps.selectedApi.port
            })
        }
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

    updateApi() {
        const apiWillBeUpdated: IApiInstance = {
            _id: this.props.selectedApi._id,
            name: this.state.name,
            port: this.state.port
        };
        apiService.putApi(apiWillBeUpdated)
            .then(() => {
                this.props.actions.ui.closeUpdateApiModal();
                apiService.getApis()
                    .then((response) => {
                        this.props.actions.apis.load(response.data.data.apis);
                    });
            })
            .catch((error) => {
                console.log(error.response.data.custom)
            })
    }

    render() {
        return (
            <UpdateApiForm
                selectedApi={this.props.selectedApi}
                name={this.state.name}
                port={this.state.port}
                isModalOpen={this.props.updateApiModal}
                closeForm={this.props.actions.ui.closeUpdateApiModal}
                handleName={this.handlerName}
                handlePort={this.handlerPort}
                updateApi={this.updateApi}
            />
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        updateApiModal: state.ui.showUpdateApiModal,
        selectedApi: state.selectedApi
    }
};

const matpDispatchToProps = (dispatch) => {
    return {
        actions: {
            ui: {
                closeUpdateApiModal: () => {
                    dispatch(UIActions.closeUpdateApiModal())
                }
            },
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApisActions.load(apis))
                }
            }
        }
    }
};

export default connect(
    mapStateToProps,
    matpDispatchToProps
)(UpdateApi);
