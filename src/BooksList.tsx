import { Box, Heading, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Params {
  q: string;
}

interface GameSearched {
  docs: BookSearched[];
}

interface BookSearched {
  key: string;
  title: string;
}

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  const [dataSearched, setDataSearched] = useState<GameSearched>({ docs: [] });
  const [params, setParams] = useState<Params>({ q: "" });

  useEffect(() => {
    axios
      .get("https://openlibrary.org/search.json", { params })
      .then((res) => setDataSearched(res.data));
  }, [params]);

  const onSearch = (params: Params) => {
    setParams(params);
  };

  if (isLoading) return "Loading...";
  if (error || !data) return "Error";

  return (
    <>
      <SearchInput onSearch={onSearch} />
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
