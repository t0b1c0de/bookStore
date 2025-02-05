import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import axiosInstance from "../services/connection";
import useSearchBookStore from "../useSearchBookStore";

const baseUrlOpenLibrary = import.meta.env.VITE_BASE_URL_OPEN_LIBRARY;

const axiosOpenLibrary = axiosInstance(baseUrlOpenLibrary);

interface FetchResponseBook {
    page: number;
    numFound: number;
    reading_log_entries: Reading_log_entry[];
}

export interface Reading_log_entry {
    work: Book;
    logged_edition: string;
    logged_data: string;
}

export interface Book {
    title: string;
    author_names: string[];
    first_publish_year: number;
    key: string;
    cover_id: number;
}


const apiClientOpenLibrary = new APIClient<FetchResponseBook>("/want-to-read.json",axiosOpenLibrary);

const useBooks = () => {
    const page = useSearchBookStore(s => s.page)
    return useQuery({
        queryKey: ["books", page],
        queryFn:() => apiClientOpenLibrary.getAll({ params: { page: page }})
    });
} 

export default useBooks;