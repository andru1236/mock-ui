const axios = require('axios');

export class ApiService {
    constructor() {
        this.BASE_URL = 'http://localhost:5000/api/v1';
        this.axiosInstance = axios.create({
            baseURL: this.BASE_URL, headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        this.END_POINT = '/apis';
    }

    postApis(name, port) {
        return this.axiosInstance.post(`${this.END_POINT}`, {
            name: name,
            port: port
        });
    }

    getApis() {
        return this.axiosInstance.get(`${this.END_POINT}`, {})
    }
}
