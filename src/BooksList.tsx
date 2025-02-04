import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import useSearchBook from "./hooks/useSearchBook";
import SearchInput from "./SearchInput";
import SortSearch from "./SortSearch";
import useSearchBookStore from "./useSearchBookStore";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  const params = useSearchBookStore((s) => s.params);
  const setMainParams = useSearchBookStore((s) => s.setMainParams);

  const { newDataSearched, numFound, isLoadingSearchBook } = useSearchBook();

  console.log(newDataSearched);

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
            Books list
          </Heading>
          {isLoading ? (
            <Spinner />
          ) : (
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
              {data?.reading_log_entries.map((entry) => (
                <BookCardContainer key={entry.work.key}>
                  <BookCard entry={entry.work} />
                </BookCardContainer>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </>
  );
};

export default BooksList;
