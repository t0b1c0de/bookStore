import { Box, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import SortSearch from "./SortSearch";
import useSearchBook from "./hooks/useSearchBook";

const SearchBookList = () => {
  const { newDataSearched, numFound, isLoadingSearchBook } = useSearchBook();
  return (
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
                <BookCardContainer key={entry.key}>
                  <BookCard entry={entry} />
                </BookCardContainer>
              ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default SearchBookList;
