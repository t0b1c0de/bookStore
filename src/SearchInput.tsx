import { Box, Heading, Input } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onSearch: (q: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Box padding={5} textAlign="left">
      <Heading fontSize="xl" padding={2}>
        Search
      </Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) onSearch(ref.current.value);
        }}
      >
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search games..."
          variant="filled"
        />
      </form>
    </Box>
  );
};

export default SearchInput;
