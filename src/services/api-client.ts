import { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient<T> {
    endpoint: string;
    axiosInstance: AxiosInstance;
    constructor(endpoint: string, axiosInstance: AxiosInstance) {
        this.endpoint = endpoint;
        this.axiosInstance = axiosInstance
    }
    getAll = (config: AxiosRequestConfig) => {
        return this.axiosInstance.get<T>(this.endpoint, config).then(res => res.data)
    };
}

export default APIClient;