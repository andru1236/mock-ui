import {toast} from 'react-semantic-toasts';

export class HandlerError {

    public static handler(error: any) {
        if (error.response.data.custom) {
            const data = error.response.data.custom;
            toast({
                type: 'error',
                icon: 'bullhorn',
                title: `Error ${data.errorName}`,
                description: ` ${data.message}`,
                animation: 'bounce',
                time: 5000,
            })
        }
    }
}