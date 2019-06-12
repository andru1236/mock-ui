import React from "react";
import * as ApiActions from '../../../../reducers/apiActions'
import {connect} from "react-redux";
import RemoveApiForm from "./RemoveApiForm";


class RemoveApi extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <RemoveApiForm

      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    showRemoveApiModal: state.ui.showRemoveApiModal
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      loadApis: (apis: any) => {
        dispatch(ApiActions.load(apis));
      }
    }
  }
};

export default connect(
  mapStateToProps
  ,
  mapDispatchToProps
)(RemoveApi);

