import {
  Box,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import useSearchBook from "./hooks/useSearchBook";
import SearchInput from "./SearchInput";
import useSearchBookStore from "./useSearchBookStore";
import SortSearch from "./SortSearch";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  const params = useSearchBookStore((s) => s.params);
  const setMainParams = useSearchBookStore((s) => s.setMainParams);

  const { dataSearched, isLoadingSearchBook } = useSearchBook();

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
                {dataSearched.numFound} Results Found
              </Heading>
              {dataSearched.numFound !== 0 && <SortSearch />}
              <List>
                {dataSearched.docs?.map((doc) => (
                  <ListItem key={doc.key}>{doc.title}</ListItem>
                ))}
              </List>
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
                  <BookCard entry={entry} />
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
