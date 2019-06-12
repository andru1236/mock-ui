import React from "react";

import {connect} from "react-redux";
import * as ApiActions from '../../../../reducers/apiActions';
import * as UIActions from '../../../../reducers/uiActions';
import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";
import RemoveApiForm from "./RemoveApiForm";
import {apiService} from "../../../../services";


interface IContainerProps {
    removeApiModal: boolean;
    selectedApi: IApiInstance;
    actions: {
        apis: {
            load(apis: IApiInstance[]): void;
        }
        ui: {
            closeRemoveApiModal(): void;
        }
    }
}


class RemoveApi extends React.Component<IContainerProps, any> {
    constructor(props: IContainerProps) {
        super(props);
        this.removeApi = this.removeApi.bind(this);
    }

    removeApi(apiId: string) {
        apiService.deleteApi(apiId)
            .then(() => {
                this.props.actions.ui.closeRemoveApiModal();
                apiService.getApis()
                    .then((response) => {
                        this.props.actions.apis.load(response.data.data.apis)
                    });
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    render() {
        return (
            <RemoveApiForm
                selectedApi={this.props.selectedApi}
                isOpenModal={this.props.removeApiModal}
                removeApi={this.removeApi}
                closeForm={this.props.actions.ui.closeRemoveApiModal}
            />
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        removeApiModal: state.ui.showRemoveApiModal,
        selectedApi: state.selectedApi
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApiActions.load(apis));
                }

            },
            ui: {
                closeRemoveApiModal: () => {
                    dispatch(UIActions.closeRemoveApiModal())
                }
            }

        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveApi);

