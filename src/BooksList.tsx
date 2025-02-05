import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import useSearchBook from "./hooks/useSearchBook";
import SearchInput from "./SearchInput";
import SortSearch from "./SortSearch";
import useSearchBookStore from "./useSearchBookStore";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  const page = useSearchBookStore((s) => s.page);
  const setPage = useSearchBookStore((s) => s.setPage);
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

  const params = useSearchBookStore((s) => s.params);
  const setMainParams = useSearchBookStore((s) => s.setMainParams);

  const { newDataSearched, numFound, isLoadingSearchBook } = useSearchBook();

  if (error) return "Error";

  return (
    <>
      <SearchInput onSearch={setMainParams} />
      {params.q || params.title || params.author ? (
        <Box>
          {isLoadingSearchBook ? (
            <Box>
              <Heading fontSize="3xl" padding={3}>
                Searching
              </Heading>
              <Spinner />
            </Box>
          ) : (
            <Box>
              <Heading fontSize="3xl" padding={3}>
                {numFound} Results Found
              </Heading>
              {numFound > 2 && <SortSearch />}
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
                {newDataSearched
                  .filter(
                    (value, index, self) =>
                      self.findIndex((item) => item.key === value.key) === index
                  )
                  .map((entry) => (
                    <Box>
                      <BookCardContainer key={entry.key}>
                        <BookCard entry={entry} />
                      </BookCardContainer>
                    </Box>
                  ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          <Heading fontSize="3xl" padding={3}>
            List of books
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <Box>
              <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
                {data?.reading_log_entries
                  .filter((book) => book.work.title)
                  .map((entry) => (
                    <BookCardContainer key={entry.work.key}>
                      <BookCard entry={entry.work} />
                    </BookCardContainer>
                  ))}
              </SimpleGrid>
              <SimpleGrid columns={{ base: 3 }} spacing={7} marginTop={6}>
                <Box>
                  <Button
                    isDisabled={page == 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                </Box>
                <Box>
                  <Text>Page {page}</Text>
                </Box>
                <Box>
                  <Button
                    isDisabled={page == lastPage}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default BooksList;
