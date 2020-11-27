import React from "react";
import { withRouter } from "react-router-dom";

// Services
import { apiServiceRest } from "../../../../../services";
// Common
import emmitToastMessage from '../../../../common/emmitToastMessage';
// Views
import BodyApiList from "./BodyApiList";
// Decorators
import { ApiContextProps, withApiConsumer } from "../../ApiContext";


interface IContainerProps extends ApiContextProps {
    history: any
}

const BodyApiListContainerV2 = (props: IContainerProps) => {
    // methods to pass through props
    const goApiPathsPage = (apiId: string) => {
        props.selectApi(apiId);
        // React route render the route component and it will be fulfilled the states via redux
        props.history.push(`/apis/${ apiId }/routes`)
    };

    const startOrStopApi = async (data: any, apiId: string, port: number) => {
        if ( data.checked ) {
            try {
                await apiServiceRest.startApi(apiId);
                emmitToastMessage.success('Launch Api instance', `Exist new api that is executing on port ${ port }`);
                props.reloadApis();
            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${ data.errorName } ${ data.message }`);
            }
        } else {
            try {
                await apiServiceRest.stopApi(apiId);
                emmitToastMessage.warning('Stop api instance', `The api instance with port ${ port } was stopped`);
                props.reloadApis();

            } catch (error) {
                emmitToastMessage.error('Error with launch api instance', `Error: ${ data.errorName } ${ data.message }`);
            }
        }
    };

    return (
        <BodyApiList
            apis={ props.apis }
            startOrStopApi={ startOrStopApi }
            goPathPage={ goApiPathsPage }
            selectedApi={ props.selectedApi }
            selectApi={ props.selectApi }
            removeApi={ props.removeApi }
            updateApi={ props.updateApi }
            reloadApis={ props.reloadApis }
        />
    );
}

export default withApiConsumer(withRouter(BodyApiListContainerV2));
