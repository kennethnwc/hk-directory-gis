import { NextPage } from "next";
import React from "react";

import { Center, Container, Heading, List, ListItem, UnorderedList } from "@chakra-ui/react";

const searchField = [
  "Company Name",
  "Building Name",
  "Address",
  "Business Type",
  "Business Description",
];

const HowToPage: NextPage = () => {
  return (
    <Center flex="1 1 auto" bg="gray.200">
      <Container>
        <List>
          <Heading fontSize="xl">
            Search: It will search the following fields:
          </Heading>
          <UnorderedList>
            {searchField.map((item) => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </UnorderedList>
        </List>
      </Container>
    </Center>
  );
};

export default HowToPage;
