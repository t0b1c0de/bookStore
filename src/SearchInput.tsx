import {
  Box,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useRef } from "react";
import useSearchBookStore from "./useSearchBookStore";

interface Props {
  onSearch: (p: string, type: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const type = useSearchBookStore((s) => s.type);
  const setType = useSearchBookStore((s) => s.setType);

  const triggerSearch = (searchType: string) => {
    if (ref.current) {
      onSearch(ref.current.value, searchType);
    }
  };

  return (
    <Box padding={5} textAlign="left">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          triggerSearch(type);
        }}
      >
        <HStack padding={2}>
          <Heading fontSize="xl" padding={2}>
            Search by
          </Heading>
          <RadioGroup
            defaultValue="keyword"
            onChange={(value) => {
              setType(value);
              triggerSearch(value);
            }}
          >
            <Radio value="keyword" paddingRight={2}>
              Keyword
            </Radio>
            <Radio value="author" paddingRight={2}>
              Author
            </Radio>
            <Radio value="title">Title</Radio>
          </RadioGroup>
        </HStack>
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search books..."
          variant="filled"
        />
      </form>
    </Box>
  );
};

export default SearchInput;
