import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Domain
import { IApiInstance } from "../../../../domain/IApiInstance";
import { IStoreState } from "../../../../reducers/domain/IStoreState";
// Redux actions
import * as ApiActions from '../../../../reducers/apiActions';
import * as UIActions from '../../../../reducers/uiActions';
// Services
import { apiService } from "../../../../services";
// Common
import emmitToastMessage from '../../../common/emmitToastMessage';
// Views
import BodyApiList from "./BodyApiList";


interface IContainerProps {
    apis: IApiInstance[];
    selectedApi: IApiInstance;
    history: any;
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

const BodyApiListContainerV2 = ({ apis, history, actions }: IContainerProps) => {
    // private methods
    const selectApi = (apiId: string) => {
        const selectedApi = apis.find((api) => api._id === apiId);
        actions.apis.selectApi(selectedApi);
    };

    const reloadApis = async () => {
        try {
            const response = await apiService.getApis();
            actions.apis.load(response.data.data.apis)
        } catch (error) {
            console.log(error.response);
        }
    };

    // methods to pass through props
    const openApiRoutesModal = (apiId: string) => {
        selectApi(apiId);
        // React route render the route component and it will be fulfilled the states via redux
        history.push(`/apis/${apiId}/routes`)
    };

    const openUpdateModal = (apiId: string) => {
        selectApi(apiId);
        actions.ui.openUpdateApiModal();
    };

    const openRemoveModal = (apiId: string) => {
        selectApi(apiId);
        actions.ui.openRemoveApiModal();
    };

    const startOrStopApi = async (data: any, apiId: string, port: number) => {
        if (data.checked) {
            try {
                await apiService.startApi(apiId);
                emmitToastMessage.success('Launch Api instance', `Exist new api that is executing on port ${port}`);
                reloadApis();
            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${data.errorName} ${data.message}`);
            }
        } else {
            try {
                await apiService.stopApi(apiId);
                emmitToastMessage.warning('Stop api instance', `The api instance with port ${port} was stopped`);
                reloadApis();

            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${data.errorName} ${data.message}`);
            }
        }
    };

    useEffect(() => {
        async function getApis() {
            try {
                const response = await apiService.getApis();
                actions.apis.load(response.data.data.apis);
            } catch (error) {
                emmitToastMessage.error('Service unavailable', 'problem with get apis')
            }
        }
        getApis()
    }, []);

    return (
        <BodyApiList
            apis={apis}
            openApiRoutesModal={openApiRoutesModal}
            openUpdateModal={openUpdateModal}
            openRemoveModal={openRemoveModal}
            startOrStopApi={startOrStopApi}
        />
    );
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
)(withRouter(BodyApiListContainerV2));
