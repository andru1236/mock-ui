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
// Decorators
import withApiActions, { withApiActionsProps } from '../../withApiActions';


/* interface IContainerProps {
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
} */

interface IContainerProps extends withApiActionsProps {
    history: any
}

const BodyApiListContainerV2 = (props: IContainerProps) => {
    // methods to pass through props
    const goApiPathsPage = (apiId: string) => {
        props.selectApi(apiId);
        // React route render the route component and it will be fulfilled the states via redux
        props.history.push(`/apis/${apiId}/routes`)
    };

    const startOrStopApi = async (data: any, apiId: string, port: number) => {
        if (data.checked) {
            try {
                await apiService.startApi(apiId);
                emmitToastMessage.success('Launch Api instance', `Exist new api that is executing on port ${port}`);
                props.reloadApis();
            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${data.errorName} ${data.message}`);
            }
        } else {
            try {
                await apiService.stopApi(apiId);
                emmitToastMessage.warning('Stop api instance', `The api instance with port ${port} was stopped`);
                props.reloadApis();

            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${data.errorName} ${data.message}`);
            }
        }
    };

    useEffect(() => {
        props.reloadApis();
    }, []);

    return (
        <BodyApiList
            apis={props.apis}
            startOrStopApi={startOrStopApi}
            goPathPage={goApiPathsPage}
            selectedApi={props.selectedApi}
            selectApi={props.selectApi}
            removeApi={props.deleteApi}
            updateApi={props.updateApi}
        />
    );
}

export default withApiActions(withRouter(BodyApiListContainerV2));
