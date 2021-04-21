import React from "react";

import { Heading, HeadingProps } from "@chakra-ui/react";

export const GroupingHeader: React.FC<HeadingProps> = ({
  children,
  ...props
}) => {
  return (
    <Heading size="md" px="10px" color="teal.500" {...props}>
      {children}
    </Heading>
  );
};
