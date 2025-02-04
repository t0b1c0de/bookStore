import axios from "axios";
import { useEffect, useState } from "react";
import useSearchBookStore from "../useSearchBookStore";
import { Book } from "./useOpenLibrary";

interface Datasearched {
  numFound: number;
  docs: BookSearched[];
}

interface BookSearched {
  key: string;
  title: string;
  first_publish_year: number;
  author_name: string[];
  cover_i: number;
}

const useSearchBook = () => {
    const [dataSearched, setDataSearched] = useState<Datasearched>({ numFound: 0, docs: [] });
    const [isLoadingSearchBook, setIsLoadingSeachBook] = useState(false);
    const params = useSearchBookStore((s) => s.params);
    const type = useSearchBookStore(s => s.type);
    
    useEffect(() => {
        setIsLoadingSeachBook(true);
        axios
        .get("https://openlibrary.org/search.json", { params })
        .then((res) => {
            setDataSearched(res.data)
            setIsLoadingSeachBook(false);
        });
    }, [params, type]);

    const newDataSearched: Book[] = dataSearched.docs.map(book => ({
      key: book.key,
      title: book.title,
      first_publish_year: book.first_publish_year,
      author_names: book.author_name,
      cover_id: book.cover_i,
    }))
    
    const numFound = dataSearched.numFound;

    return {newDataSearched , numFound, isLoadingSearchBook};
}

export default useSearchBook;