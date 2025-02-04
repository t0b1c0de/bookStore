import { Radio, RadioGroup } from "@chakra-ui/react";

interface Props {
  getThatType: (newType: string) => void;
}

const BookFilter = ({ getThatType }: Props) => {
  return (
    <RadioGroup
      onChange={(value) => {
        getThatType(value);
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
  );
};

export default BookFilter;
