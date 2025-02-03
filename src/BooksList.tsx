import { Box, Heading, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import useSearchBook from "./hooks/useSearchBook";
import SearchInput from "./SearchInput";
import useSearchBookStore from "./useSearchBookStore";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();
  const dataSearched = useSearchBook();

  const params = useSearchBookStore((s) => s.params);
  const setKeyword = useSearchBookStore((s) => s.setKeyword);


  if (isLoading) return "Loading...";
  if (error || !data) return "Error";

  return (
    <>
      <SearchInput onSearch={setKeyword} />
      {params.q ? (
        <Box>
          <Heading fontSize="3xl" padding={3}>
            Books Searched
          </Heading>
          <List>
            {dataSearched.docs?.map((doc) => (
              <ListItem key={doc.key}>{doc.title}</ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box>
          <Heading fontSize="3xl" padding={3}>
            Books list
          </Heading>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={6}>
            {data.reading_log_entries.map((entry) => (
              <BookCardContainer key={entry.work.key}>
                <BookCard entry={entry} />
              </BookCardContainer>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

export default BooksList;
