import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Book } from "./hooks/useOpenLibrary";
import BookAttributes from "./BookAttributes";

interface Props {
  entry: Book;
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
        {entry?.title}
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2 }}>
          <Box>
            {entry.cover_id ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${entry?.cover_id}-M.jpg`}
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform .15s ease-in",
                }}
                height="200px"
                objectFit={"contain"}
              />
            ) : (
              <Image
                src={
                  "https://greenhousescribes.com/wp-content/uploads/2020/10/book-cover-generic.jpg"
                }
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform .15s ease-in",
                }}
                height="200px"
                objectFit={"contain"}
              />
            )}
          </Box>
          <Box>
            <BookAttributes work={entry}></BookAttributes>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default BookCard;
