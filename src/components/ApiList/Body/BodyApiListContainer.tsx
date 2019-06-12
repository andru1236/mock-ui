import React from "react";
import {connect} from "react-redux";
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


interface IContainerProps {
    apis: IApiInstance[];
    selectedApi: IApiInstance;
    actions: {
        apis: {
            load(apis: IApiInstance[]): void;
            selectApi(api: IApiInstance): void;
        };
        ui: {
            openUpdateApiModal(): void;
            openRemoveApiModal(): void;
        }

    };
}

class BodyApiListContainer extends React.Component<IContainerProps, any> {


    constructor(props: IContainerProps) {
        super(props);

        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.openRemoveModal = this.openRemoveModal.bind(this);
    }

    private selectApi(apiId: string) {
        const selectedApi = this.props.apis.find((api) => api._id == apiId);
        this.props.actions.apis.selectApi(selectedApi);
    }

    openUpdateModal(apiId: string) {
        this.selectApi(apiId);
        this.props.actions.ui.openUpdateApiModal();
    }

    openRemoveModal(apiId: string) {
        this.selectApi(apiId);
        this.props.actions.ui.openRemoveApiModal();
    }

    componentDidMount() {
        apiService.getApis()
            .then((response: any) => {
                this.props.actions.apis.load(response.data.data.apis)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    render() {
        return (
            <BodyApiList
                apis={this.props.apis}
                openUpdateModal={this.openUpdateModal}
                openRemoveModal={this.openRemoveModal}
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
)(BodyApiListContainer);