import axios from "axios";
import { useEffect, useState } from "react";
import useSearchBookStore from "../useSearchBookStore";

interface Datasearched {
  numFound: number;
  docs: BookSearched[];
}

interface BookSearched {
  key: string;
  title: string;
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

    return {dataSearched, isLoadingSearchBook};
}

export default useSearchBook;