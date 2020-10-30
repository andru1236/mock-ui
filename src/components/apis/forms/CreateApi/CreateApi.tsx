import React, { useState } from "react";
import { toast } from 'react-semantic-toasts';
import { apiService } from "../../../../services";
// Actions
import * as UIActions from '../../../../reducers/uiActions';
import * as ApiActions from '../../../../reducers/apiActions';
// AddRouteForm
import CreateApiForm from './CreateApiForm';
import { connect } from "react-redux";
import { IApiInstance } from "../../../../domain/IApiInstance";
import { IStoreState } from "../../../../reducers/domain/IStoreState";
import { HandlerError } from "../../../utils/HandlerError";

interface IContainerProps {
    createApiModal: boolean;
    actions: {
        ui: {
            closeCreateApiModal(): void;
        },
        apis: {
            load(apis: IApiInstance[]): void
        }

    }
}

interface IContainerState {
    name: string;
    port: number;
}

const CreateApiV2 = (props: IContainerProps) => {
    const [name, setName] = useState("");
    const [port, setPort] = useState(0);

    const handlerName = (event: any) => setName(event.target.value);
    const handlerPort = (event: any) => setPort(parseInt(event.target.value));
    
    const cleanFields = () => {
        setName('');
        setPort(0);
    };

    const guardClause = () => {
        if (name === '' && port === 0) {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: 'Error on fields',
                description: `name should be a strings and port should be a number`,
                animation: 'bounce',
                time: 5000,
            });
            return false;
        }
        return true;
    };

    const createApi = () => {
        if (guardClause()) {
            const newApiInstance: IApiInstance = {
                name: name,
                port: port
            };
            apiService.postApis(newApiInstance)
                .then(() => {
                    props.actions.ui.closeCreateApiModal();
                    apiService.getApis()
                        .then((response: any) => {
                            props.actions.apis.load(response.data.data.apis);
                            cleanFields();
                        })
                        .catch((error: any) => {
                            // TODO: add logic for this error
                            console.log(error.response);
                            HandlerError.handler(error);
                        });
                })
                .catch((error: any) => {
                    HandlerError.handler(error);
                });
        }
    };

    return (
        <CreateApiForm
            isOpenModal={props.createApiModal}
            closeForm={props.actions.ui.closeCreateApiModal}
            handleName={handlerName}
            handlePort={handlerPort}
            createApi={createApi}
        />
    );

}

const mapStateToProps = (state: IStoreState) => {
    return {
        createApiModal: state.ui.showCreateApiModal
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            ui: {
                closeCreateApiModal: () => {
                    dispatch(UIActions.closeCreateApiModal())
                }
            },
            apis: {
                load: (apis: IApiInstance[]) => {
                    dispatch(ApiActions.load(apis))
                }
            }

        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateApiV2);