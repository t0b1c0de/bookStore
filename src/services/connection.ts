import axios from "axios";

const axiosInstance = (baseUrl: string, APIKey: string) => axios.create({
    baseURL: baseUrl,
    params: {
        apiKey: APIKey
    }
});

export default axiosInstance;