import axios from "axios";
import { useEffect, useState } from "react";
import useSearchBookStore from "../useSearchBookStore";

interface Datasearched {
  docs: BookSearched[];
}

interface BookSearched {
  key: string;
  title: string;
}

const useSearchBook = () => {
    const [dataSearched, setDataSearched] = useState<Datasearched>({ docs: [] });
    const params = useSearchBookStore((s) => s.params);
    
    useEffect(() => {
        axios
        .get("https://openlibrary.org/search.json", { params })
        .then((res) => setDataSearched(res.data));
    }, [params]);

    return dataSearched;
}

export default useSearchBook;