import {
  Box,
  Card,
  CardBody,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Book } from "./hooks/useOpenLibrary";

interface Props {
  work: Book;
}

const BookAttributes = ({ work }: Props) => {
  return (
    <Card>
      <CardBody>
        <Box marginY={2}>
          <Heading fontSize="md">Author(s):</Heading>
          {work && work.author_names ? (
            <List>
              {work.author_names
                .filter((value, index, self) => self.indexOf(value) === index)
                .map((author) => (
                  <ListItem key={author}>{author}</ListItem>
                ))}
            </List>
          ) : (
            <Text>Unknown</Text>
          )}
        </Box>
        <Box marginY={2}>
          <Heading fontSize="md">Year of publication:</Heading>
          <Text>
            {work.first_publish_year ? work?.first_publish_year : "Unknown"}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default BookAttributes;
