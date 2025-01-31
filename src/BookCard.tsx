import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import BookAttributes from "./BookAttributes";
import { Reading_log_entry } from "./hooks/useOpenLibrary";

interface Props {
  entry: Reading_log_entry;
}

const BookCard = ({ entry }: Props) => {
  return (
    <Card>
      <CardHeader
        as="h2"
        fontSize="xl"
        color="gray.100"
        padding={2}
        height="80px"
      >
        {entry?.work.title}
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2 }}>
          <Box>
            <Image
              src={`https://covers.openlibrary.org/b/id/${entry?.work.cover_id}-M.jpg`}
              _hover={{
                transform: "scale(1.1)",
                transition: "transform .15s ease-in",
              }}
              height="200px"
              objectFit={"contain"}
            />
          </Box>
          <Box>
            <BookAttributes work={entry.work}></BookAttributes>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default BookCard;
