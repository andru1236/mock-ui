import * as React from 'react';
import * as UIActions from '../../../../reducers/uiActions';
import * as ApiActions from '../../../../reducers/apiActions';
import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";
import {connect} from "react-redux";
import RoutesApiForm from "./RoutesApiForm";
import {apiService} from "../../../../services";

interface IContainerProps {
    selectedApi: IApiInstance;
    apiRouteModal: boolean;
    actions: {
        apis: {
            load(apis: IApiInstance[]): void;
        },
        ui: {
            closeApiRoutesModal(): void;
        }
    }
}

class RoutesApi extends React.Component<IContainerProps, any> {


    constructor(props: IContainerProps) {
        super(props);
        this.reloadApis = this.reloadApis.bind(this);
    }

    reloadApis() {
        this.props.actions.ui.closeApiRoutesModal();
        apiService.getApis()
            .then((response) => {
                this.props.actions.apis.load(response.data.data.apis);
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    render() {
        return (
            <RoutesApiForm
                selectedApi={this.props.selectedApi}
                isModalOpen={this.props.apiRouteModal}
                reloadApis={this.reloadApis}
                closeForm={this.props.actions.ui.closeApiRoutesModal}
            />
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        selectedApi: state.selectedApi,
        apiRouteModal: state.ui.showApiRoutesModal
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApiActions.load(apis))
                }
            },
            ui: {
                closeApiRoutesModal: () => {
                    dispatch(UIActions.closeApiRoutesModal())
                }
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoutesApi);