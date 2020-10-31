import React from 'react';
// Actions
import * as UIActions from '../../reducers/uiActions';
import { IStoreState } from '../../reducers/domain/IStoreState';
import { compose } from 'redux';
import { connect } from 'react-redux';


const mapStateToProps = (state: IStoreState) => {
    return {
        isOpen: state.ui.isOpen
    };
}

const mapDispatchToProps = dispatch => {
    return {
        isOpenTrue: () => dispatch(UIActions.isOpenTrue()),
        isOpenFalse: () => dispatch(UIActions.isOpenFalse())
    }
}

export interface withIsOpenProps {
    isOpen: boolean;
    isOpenTrue(): void;
    isOpenFalse(): void;
};

const IsOpen = Component => (props: withIsOpenProps) => {
    return (<Component {...props}/>);
};

const withIsOpen = compose(
    connect(mapStateToProps, mapDispatchToProps),
    IsOpen
);

export default withIsOpen;