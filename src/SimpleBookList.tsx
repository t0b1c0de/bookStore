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
import useSearchBookStore from "./useSearchBookStore";

const SimpleBookList = () => {
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

  if (error) return "Error";

  return (
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
              <Button isDisabled={page == 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
            </Box>
            <Box>
              <Text>
                Page {page} / {lastPage}
              </Text>
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
  );
};

export default SimpleBookList;
