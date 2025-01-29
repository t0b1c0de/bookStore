import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import useBooks from "./hooks/useOpenLibrary";

const BooksList = () => {
  const { data, error, isLoading } = useBooks();

  if (isLoading) return "Loading...";
  if (error || !data) return "Error";

  return (
    <SimpleGrid column={{ base: 1, md: 2 }}>
      {data.reading_log_entries.map((entry) => (
        <Box key={entry.work.key}>{entry?.work.title}</Box>
      ))}
    </SimpleGrid>
  );
};

export default BooksList;
