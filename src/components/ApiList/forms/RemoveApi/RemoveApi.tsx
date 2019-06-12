import React from "react";
import * as ApiActions from '../../../../reducers/apiActions';
import * as UIActions from '../../../../reducers/uiActions';
import {connect} from "react-redux";
import RemoveApiForm from "./RemoveApiForm";
import {IApiInstance} from "../../../../domain/IApiInstance";

interface IContainerProps {
    removeApiModal: boolean;
    actions: {
        api: {
            loadApis(apis: IApiInstance[]): void;
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

    removeApi(event: any) {

    }

    render() {
        return (
            <RemoveApiForm
                isOpenModal={this.props.removeApiModal}
                removeApi={this.removeApi}
                closeForm={this.props.actions.ui.closeRemoveApiModal}
            />
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        removeApiModal: state.ui.showRemoveApiModal
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            api: {
                loadApis: (apis: IApiInstance[]) => {
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

