import * as React from 'react';
import * as UIActions from '../../../../reducers/uiActions';
import * as ApiActions from '../../../../reducers/apiActions';
import { IApiInstance } from "../../../../domain/IApiInstance";
import { IStoreState } from "../../../../reducers/domain/IStoreState";
import { toast } from 'react-semantic-toasts';
import { connect } from "react-redux";
import RoutesApiForm from "./RoutesApiForm";
import { withRouter } from "react-router-dom";
import { apiService } from "../../../../services";

interface IContainerProps {
    selectedApi: IApiInstance;
    apiRouteModal: boolean;
    history: any;
    match: any;
    actions: {
        apis: {
            loadApi(api: IApiInstance): void;
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

    componentDidMount() {
        this.reloadApis()
    }

    getApiId() {
        return this.props.match.params.apiId
    }

    reloadApis() {
        apiService.getApi(this.getApiId())
            .then((response: any) => {
                this.props.actions.apis.loadApi(response.data.data)
            })
            .catch((error: any) => {
                toast({
                    type: 'error',
                    icon: 'bullhorn',
                    title: 'Service unavailable',
                    description: `problem with get api`,
                    animation: 'bounce',
                    time: 5000,
                });
            });
    }

    render() {
        return (
            <RoutesApiForm
                selectedApi={this.props.selectedApi}
                isModalOpen={this.props.apiRouteModal}
                reloadApis={this.reloadApis}
                closeForm={this.props.actions.ui.closeApiRoutesModal}
                history={this.props.history}
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
                loadApi: (api: IApiInstance) => {
                    dispatch(ApiActions.loadApi(api))
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
)(withRouter(RoutesApi));
