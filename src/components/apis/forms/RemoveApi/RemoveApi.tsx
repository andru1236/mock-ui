import React from "react";
// import { connect } from "react-redux";
// // Redux
// import * as ApiActions from '../../../../reducers/apiActions';
// import * as UIActions from '../../../../reducers/uiActions';
// import { IStoreState } from "../../../../reducers/domain/IStoreState";
// // Domain
// import { IApiInstance } from "../../../../domain/IApiInstance";
// // Services
// import { apiService } from "../../../../services";
// // Views
// import RemoveApiForm from "../RemoveApiForm";



// interface IContainerProps {
//     removeApiModal: boolean;
//     selectedApi: IApiInstance;
//     actions: {
//         apis: {
//             load(apis: IApiInstance[]): void;
//         }
//         ui: {
//             closeRemoveApiModal(): void;
//         }
//     }
// }

// const RemoveApiV2 = (props: IContainerProps) => {
//     const removeApi = (apiId: string) => {
//         apiService.deleteApi(apiId)
//             .then(() => {
//                 props.actions.ui.closeRemoveApiModal();
//                 apiService.getApis()
//                     .then((response) => {
//                         props.actions.apis.load(response.data.data.apis)
//                     });
//             })
//             .catch((error) => {
//                 console.log(error.response)
//             })
//     }

//     return (
//         <RemoveApiForm
//             selectedApi={props.selectedApi}
//             isOpenModal={props.removeApiModal}
//             removeApi={removeApi}
//             closeForm={props.actions.ui.closeRemoveApiModal}
//         />
//     );
// };

// const mapStateToProps = (state: IStoreState) => {
//     return {
//         removeApiModal: state.ui.showRemoveApiModal,
//         selectedApi: state.selectedApi
//     }
// };

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         actions: {
//             apis: {
//                 load: (apis: IApiInstance[]) => {
//                     dispatch(ApiActions.load(apis));
//                 }

//             },
//             ui: {
//                 closeRemoveApiModal: () => {
//                     dispatch(UIActions.closeRemoveApiModal())
//                 }
//             }

//         }
//     }
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(RemoveApiV2);

