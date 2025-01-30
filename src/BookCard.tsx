import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { Reading_log_entry } from "./hooks/useOpenLibrary";

interface Props {
  entry: Reading_log_entry;
}

const BookCard = ({ entry }: Props) => {
  return (
    <Card>
      <CardHeader as="h2" fontSize="xl" color="gray.100" padding={2}>
        {entry?.work.title}
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 2 }}>
          <Box>
            <Image
              src={`https://covers.openlibrary.org/b/id/${entry?.work.cover_id}-M.jpg`}
              _hover={{
                transform: "scale(1.03)",
                transition: "transform .15s ease-in",
              }}
            />
          </Box>
          <Box>
            <Text>Test</Text>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default BookCard;
