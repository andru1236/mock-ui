import React from 'react';
// Actions
import * as UIActions from '../../reducers/uiActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {IStoreState} from "../../domain/reducer";


const mapStateToProps = (state: IStoreState) => {
    return {
        isSecondOpen: state.ui.isSecondOpen
    };
}

const mapDispatchToProps = dispatch => {
    return {
        isSecondOpenTrue: () => dispatch(UIActions.isSecondOpenTrue),
        isSecondOpenFalse: () => dispatch(UIActions.isSecondOpenFalse)
    }
}


export interface withIsSecondOpenProps {
    isOpen: boolean;
    isOpenTrue(): void;
    isOpenFalse(): void;
};

const IsSecondOpen = Component => (props: withIsSecondOpenProps) => {
    return (<Component {...props}/>);
};

const withIsSecondOpen = compose(
    connect(mapStateToProps, mapDispatchToProps),
    IsSecondOpen
);

export default withIsSecondOpen;