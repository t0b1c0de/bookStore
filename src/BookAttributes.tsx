import {
  Box,
  Card,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Book } from "./hooks/useOpenLibrary";

interface Props {
  work: Book;
}

const BookAttributes = ({ work }: Props) => {
  return (
    <Card>
      <Box marginY={2}>
        <Heading fontSize="md">Author(s):</Heading>
        <List>
          {work?.author_names
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((author) => (
              <ListItem key={author}>{author}</ListItem>
            ))}
        </List>
      </Box>
      <Box marginY={2}>
        <Heading fontSize="md">Year of publication:</Heading>
        <Text>{work?.first_publish_year}</Text>
      </Box>
    </Card>
  );
};

export default BookAttributes;
