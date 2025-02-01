import { Heading, SimpleGrid } from "@chakra-ui/react";
import BookCard from "./BookCard";
import BookCardContainer from "./BookCardContainer";
import useBooks from "./hooks/useOpenLibrary";
import SearchInput from "./SearchInput";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  if (isLoading) return "Loading...";
  if (error || !data) return "Error";

  return (
    <>
      <SearchInput />
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
    </>
  );
};

export default BooksList;
