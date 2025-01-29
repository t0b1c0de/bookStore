import { useQuery } from "@tanstack/react-query";
import APIClient, { axiosInstance } from "../services/api-client";

const baseUrlNewsApi = import.meta.env.VITE_BASE_URL_NEWSAPI;
const apiKeyNewsApi = import.meta.env.VITE_API_KEY_NEWSAPI;

const axiosNewAPI = axiosInstance(
  baseUrlNewsApi,
  apiKeyNewsApi
);

interface NewAPI {
  title: string;
  description: string;
  content: string;
  source: { id: string; name: string };
  urlToImage: string;
  author: string;
  publishedAt: Date;
}

const apiClientNewAPI = new APIClient<NewAPI>("/everything", axiosNewAPI);

const useNewsApi = () => useQuery({
    queryKey: ["articlesNewAPI"],
    queryFn: () => apiClientNewAPI.getAll({params:{q: "tech", language: "en"}}),
  });

export default useNewsApi
