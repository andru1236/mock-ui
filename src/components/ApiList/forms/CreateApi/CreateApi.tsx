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
        closeCreateApiModal(): void;
        loadApis(api: IApiInstance[]): void
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
                this.props.actions.closeCreateApiModal();
                apiService.getApis()
                    .then((response: any) => {
                        this.props.actions.loadApis(response.data.data.apis);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            })
            .catch((error: any) => {
                console.log(error)
            });
    }

    render() {
        return (
            <CreateApiForm
                isOpenModal={this.props.createApiModal}
                closeForm={this.props.actions.closeCreateApiModal}
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

const mapDispatchProps = (dispatch: any) => {
    return {
        actions: {
            closeCreateApiModal: () => {
                dispatch(UIActions.closeCreateApiModal())
            },
            loadApis: (apis: IApiInstance[]) => {
                dispatch(ApiActions.load(apis))
            }
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchProps
)(CreateApi);