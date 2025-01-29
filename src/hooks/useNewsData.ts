import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import axiosInstance from "../services/connection";

const baseUrlNewsData = import.meta.env.VITE_BASE_URL_NEWSDATA;
const apiKeyNewsData = import.meta.env.VITE_API_KEY_NEWSDATA;
  
interface FetchResponseNewsData {
  status: string;
  totalResults: number;
  results: NewData[];
}

interface NewData {
  title: string;
  description: string;
  content: string;
  article_id: string;
  link: string;
  keyword: string[];
  creator: string[];
  pubDate: Date;
  language: string;
  image_url: string;
}

const axiosNewData = axiosInstance(
  baseUrlNewsData,
  apiKeyNewsData
);

const apiClientNewData = new APIClient<FetchResponseNewsData>("/latest", axiosNewData);

const useNewsData = () => useQuery({
    queryKey: ["articlesNewsData"],
    queryFn: apiClientNewData.getAll,
  });

export default useNewsData;