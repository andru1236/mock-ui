import * as React from "react";
import {apiService} from "../../../../services";
// Actions
import * as UIActions from '../../../../reducers/uiActions';
import * as ApiActions from '../../../../reducers/apiActions';
// Form
import CreateApiForm from './CreateApiForm';
import {connect} from "react-redux";
import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";

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
    }

    handlerName(event: any) {
        this.setState({
            name: event.target.value
        })
    }

    handlerPort(event: any) {
        this.setState({
            port: event.target.value
        })
    }

    createApi() {
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
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            })
            .catch((error: any) => {
                console.log(error.response)
            });
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