import React from "react";

import {connect} from "react-redux";
import * as ApiActions from '../../../../reducers/apiActions';
import * as UIActions from '../../../../reducers/uiActions';
import {IApiInstance} from "../../../../domain/IApiInstance";
import {IStoreState} from "../../../../reducers/domain/IStoreState";
import RemoveApiForm from "./RemoveApiForm";


interface IContainerProps {
    removeApiModal: boolean;
    selectedApi: IApiInstance;
    actions: {
        api: {
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
            api: {
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

