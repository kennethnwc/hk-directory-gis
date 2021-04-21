import React from "react";

import { Box, Flex } from "@chakra-ui/react";

export const Footer: React.FC = () => {
  return (
    <Flex
      justifyContent="center"
      as="footer"
      textAlign="center"
      alignItems="center"
      fontSize="0.85rem"
      flexDirection="column"
      flex="0 1 100px"
      color="white"
      bg="#2cbb93"
    >
      <Flex
        w="100%"
        justifyContent="space-evenly"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box>
          Project Source: Michael Ng, Edwin Chow, David W.S. Wong and Carlo Lo,
          <cite>"Historical GIS Study of Hong Kong, 1900s-1940s"</cite> (funded
          by Research Grant Council of the HK Government , project code: HKU
          17407214 ).
        </Box>
      </Flex>
    </Flex>
  );
};
