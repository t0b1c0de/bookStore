import { Box, Heading, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import BookFilter from "./BookFilter";

interface Props {
  onSearch: (p: string, type: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [type, setType] = useState("keyword");

  const getType = (newType: string) => {
    setType(newType);
  };

  return (
    <Box padding={5} textAlign="left">
      <Heading fontSize="xl" padding={2}>
        Search
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            onSearch(ref.current.value, type);
          }
        }}
      >
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </form>
      <BookFilter getThatType={getType} />
    </Box>
  );
};

export default SearchInput;
