import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = (baseUrl: string, APIKey: string) => axios.create({
    baseURL: baseUrl,
    params: {
        apiKey: APIKey
    }
});

interface FetchResponseBase {
    status: string;
    totalResults: number;
}

interface FetchResponseNewsApi<T> extends FetchResponseBase {
    articles: T[];
    results?: never;
}

interface FetchResponseNewsData<T> extends FetchResponseBase {
    results: T[];
    articles ?: never;
}

type FetchResponse<T> = FetchResponseNewsApi<T> | FetchResponseNewsData<T>;

class APIClient<T> {
    endpoint: string;
    axiosInstance: AxiosInstance;
    constructor(endpoint: string, axiosInstance: AxiosInstance) {
        this.endpoint = endpoint;
        this.axiosInstance = axiosInstance
    }
    getAll = (config: AxiosRequestConfig) => {
        return this.axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then(res => res.data)
    };
}

export default APIClient;