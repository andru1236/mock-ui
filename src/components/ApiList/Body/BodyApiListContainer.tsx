import React from "react";
import {connect} from "react-redux";
// Domain
import {IApiInstance} from "../../../domain/IApiInstance";
import {IStoreState} from "../../../reducers/domain/IStoreState";
// Redux actions
import * as ApiActions from '../../../reducers/apiActions'
// Services
import {apiService} from "../../../services";
// Views
import BodyApiList from "./BodyApiList";


interface IContainerProps {
    apis: IApiInstance[];
    actions: {
        loadApis(apis: IApiInstance[]): void;
    }
}

class BodyApiListContainer extends React.Component<IContainerProps, any> {

    componentDidMount() {
        apiService.getApis()
            .then((response: any) => {
                this.props.actions.loadApis(response)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    render() {
        return (
            <BodyApiList apis={this.props.apis}/>
        );
    }
}

const mapStateToProps = (state: IStoreState) => {
    return {
        apis: state.apis
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            loadApis: (apis: any) => {
                dispatch(ApiActions.load(apis))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BodyApiListContainer);