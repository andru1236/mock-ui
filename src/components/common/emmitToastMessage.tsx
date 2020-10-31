import { toast } from 'react-semantic-toasts';

// to show alerts in UI
export default {
    error: (title: string, description: string) => {
        toast({
            type: 'error',
            icon: 'bullhorn',
            title: title,
            description: description,
            animation: 'bounce',
            time: 5000,
        });
    },
    warning: (title: string, description: string) => {
        toast({
            type: 'warning',
            icon: 'bullhorn',
            title: title,
            description: description,
            animation: 'bounce',
            time: 5000,
        });
    },
    success: (title: string, description: string) => {
        toast({
            type: 'success',
            icon: 'bullhorn',
            title: title,
            description: description,
            animation: 'bounce',
            time: 5000,
        });
    }
};
