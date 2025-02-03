import {
  Box,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import SearchInput from "./SearchInput";
import useSearchBookStore from "./useSearchBookStore";
import useSearchBook from "./hooks/useSearchBook";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  const params = useSearchBookStore((s) => s.params);
  const setKeyword = useSearchBookStore((s) => s.setKeyword);

  const { dataSearched, isLoadingSearchBook } = useSearchBook();

  if (isLoading) return "Loading...";
  if (error || !data) return "Error";

  return (
    <>
      <SearchInput onSearch={setKeyword} />
      {params.q ? (
        <Box>
          {isLoadingSearchBook ? (
            <Box>
              <Heading fontSize="3xl" padding={3}>
                Searching by keyword
              </Heading>
              <Spinner />
            </Box>
          ) : (
            <Box>
              <Heading fontSize="3xl" padding={3}>
                {dataSearched.numFound} Results Found
              </Heading>
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
