import React, { Fragment, useState } from "react";
import { Table, Checkbox, Button } from "semantic-ui-react";

// Domain
import { IApiInstance } from "../../../../domain/api";
// sources
import { startApi, stopApi } from "../../sources/gql";

// HOCs
import { withApiConsumer, ApiContextProps } from "../ApiContext";
import { withRouter } from "react-router-dom";
import emmitToastMessage from "../../../common/emmitToastMessage";

// Components
import ConfirmRemoveApi from '../forms/ConfirmRemoveApi';
import FormApi from '../forms/FormApi';
import ConfirmCloneApi from '../forms/ConfirmCloneApi';

interface IViewProps extends ApiContextProps {
    history: any;
}


const BodyApiList = ({ apisToDisplay, reloadApis, selectApi, history }: IViewProps) => {
    const [isOpenDeleteApi, setIsOpenDeleteApi] = useState(false);
    const [isOpenUpdateApi, setIsOpenUpdateApi] = useState(false);
    const [isOpenCloneApi, setIsOpenCloneApi] = useState(false);

    const startOrStopApi = async (isNotRunning, api) => {
        if (isNotRunning) {
            await startApi(api._id);
        } else {
            await stopApi(api._id);
            emmitToastMessage.warning('Stop api instance', `The api instance with port ${api.port} was stopped`);
        }
        await reloadApis();
    }

    return (
        <Fragment>
            <Table.Body>
                {apisToDisplay.map((api: IApiInstance) => (
                    <Table.Row key={api._id} positive={api.settings.enabled} negative={api.routes.length === 0}>
                        <Table.Cell collapsing>
                            <Checkbox checked={api.settings.enabled} slider
                                onClick={(event, data) => startOrStopApi(data.checked, api)}
                            />
                        </Table.Cell>
                        <Table.Cell>{api.name}</Table.Cell>
                        <Table.Cell>{api.port}</Table.Cell>
                        <Table.Cell>{api.routes.length} </Table.Cell>

                        <Table.Cell>
                            <Button basic size={'tiny'} color={'green'} onClick={() => {
                                selectApi(api._id);
                                history.push(`/apis/${api._id}/routes`);
                            }}>
                                {"Routes"}
                            </Button>
                            <Button basic size={'tiny'} color={'blue'} onClick={() => {
                                selectApi(api._id);
                                setIsOpenUpdateApi(true);
                            }}>
                                {"Update Api"}
                            </Button>
                            <Button basic size={'tiny'} color={'red'} onClick={() => {
                                selectApi(api._id);
                                setIsOpenDeleteApi(true);
                            }}>
                                {"Remove"}
                            </Button>
                            <Button basic size={'tiny'} color={'orange'} onClick={() => {
                                selectApi(api._id);
                                setIsOpenCloneApi(true);
                            }}>
                                {"Clone Api"}
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

            {/* Forms */}
            <ConfirmRemoveApi
                isOpenModal={isOpenDeleteApi}
                closeForm={() => setIsOpenDeleteApi(false)}
            />

            <FormApi
                isOpenModal={isOpenUpdateApi}
                closeForm={() => setIsOpenUpdateApi(false)}
                action={'Update'}
            />

            <ConfirmCloneApi
                isOpenModal={isOpenCloneApi}
                closeForm={() => setIsOpenCloneApi(false)}
            />
        </Fragment>

    )
};

export default withApiConsumer(withRouter(BodyApiList));
