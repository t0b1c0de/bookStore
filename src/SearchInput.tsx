import { Box, Heading, Input } from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <Box padding={5} textAlign="left">
      <Heading fontSize="xl" padding={2}>
        Search
      </Heading>
      <Input borderRadius={20} placeholder="Search games..." variant="filled" />
    </Box>
  );
};

export default SearchInput;
