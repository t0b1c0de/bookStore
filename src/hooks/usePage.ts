import { useEffect, useRef, useState } from "react";
import { FetchResponseBook } from "./useOpenLibrary";

interface Props {
    data: FetchResponseBook;
}

const usePage = ({ data } : Props ) => {
    const [pageSize, setPageSize] = useState(1);
    const [totalElement, setTotalElement] = useState(0);
    const isInitialized = useRef(false);
    useEffect(() => {
      if (data && !isInitialized.current && data.numFound !== 0) {
        setTotalElement(data.numFound);
        setPageSize(
          data.reading_log_entries.length < data.numFound
            ? data.reading_log_entries.length
            : data.numFound
        );
        isInitialized.current = true;
      }
    }, [data?.numFound]);
    const lastPage = pageSize ? Math.ceil(totalElement / pageSize) : 1;

    return lastPage;
}

export default usePage;