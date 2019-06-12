import React from 'react';
import * as UIActions from '../../../reducers/uiActions';
import {connect} from "react-redux";
import FooterApiList from "./FooterApiList";

interface IContainerProps {
  actions: {
    openCreateApiModal(): void;
  }
}


const FooterApiListContainer = (props: IContainerProps) => (
  <FooterApiList
    openModal={props.actions.openCreateApiModal}
  />
);

const mapDispatchTotProps = (dispatch: any) => {
  return {
    actions: {
      openCreateApiModal: () => {
        dispatch(UIActions.openCreateApiModal())
      }
    }
  }
};

export default connect(
  null,
  mapDispatchTotProps
)(FooterApiListContainer);