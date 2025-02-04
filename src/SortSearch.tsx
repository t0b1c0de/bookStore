import { Box, Select, Text } from "@chakra-ui/react";
import useSearchBookStore from "./useSearchBookStore";

const SortSearch = () => {
  const setSort = useSearchBookStore((s) => s.setSort);
  return (
    <Box marginY={4}>
      <Text align="left" marginY={1}>
        Sort by
      </Text>
      <Select
        onChange={(event) => {
          setSort(event.target.value);
        }}
      >
        <option value="key">Keyword</option>
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="random">Random</option>
      </Select>
    </Box>
  );
};

export default SortSearch;
