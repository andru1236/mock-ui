export interface TrackingRoute{
    path: string;
    method: string;
    date: Date;
}

export interface TrackingAssignation {
    api_id: string;
    routes?: TrackingRoute[];
}

export interface IResponse {
    _id?: string;
    name: string;
    response: any;
    tracking_assignation?: TrackingAssignation[];
    created_on?: Date;
}
