import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const BookCardContainer = ({ children }: Props) => {
  return <Box overflow="hidden">{children}</Box>;
};

export default BookCardContainer;
