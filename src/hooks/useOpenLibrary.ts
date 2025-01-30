import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/connection";
import APIClient from "../services/api-client";

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
    logged_data: Date;
}

interface Book {
    title: string;
    author_names: string[];
    key: string;
    cover_id: number;
}

const apiClientOpenLibrary = new APIClient<FetchResponseBook>("/want-to-read.json",axiosOpenLibrary);

const useBooks = () => useQuery({
    queryKey: ["books"],
    queryFn: apiClientOpenLibrary.getAll
});

export default useBooks;