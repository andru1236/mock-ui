import { toast } from 'react-semantic-toasts';
import emmitToastMessage from "./emmitToastMessage";

export class HandlerError {

    public static handler (error: any) {
        if ( error.response?.data?.custom ) {
            const data = error.response.data.custom;
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: `Error ${ data.errorName }`,
                description: ` ${ data.message }`,
                animation: 'bounce',
                time: 5000,
            })
        } else {
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: `Unkown Error!!!`,
                description: ` Unexpected system error!!!! check the backend logs`,
                animation: 'bounce',
                time: 5000,
            })
        }
    }
}

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