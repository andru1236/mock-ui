import emmitToastMessage from "./emmitToastMessage";

export const handlerError = (error: any) => {
    if ( error.response?.data?.custom ) {
        const data = error.response.data.custom;
        emmitToastMessage.error(
          `Error ${ data.errorName }`,
          ` ${ data.message }`
        );
    } else {
        emmitToastMessage.error(
          `Unkown Error!!!`,
          ` Unexpected system error!!!! check the backend logs`
        );
    }
}