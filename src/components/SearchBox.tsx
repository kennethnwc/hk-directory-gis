import React, { useEffect, useState } from "react";

import { QuestionOutlineIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
} from "@chakra-ui/react";

import { IAddress } from "../";
import { useMyStore } from "../lib/store";
import { GroupingHeader } from "./ui/GroupingHeader";

const searchField = [
  "Company Name",
  "Building Name",
  "Address",
  "Business Type",
  "Business Description",
];

export const SearchBox: React.FC = () => {
  const {
    updateFilter,
    updateSearchQuery,
    searchQuery,
    updatePanelOpen,
  } = useMyStore();
  const [inputQuery, setInputQuery] = useState(searchQuery);

  useEffect(() => {
    const fetching = async () => {
      const response: IAddress[] = await fetch(
        "/api/search?q=" + searchQuery
      ).then((r) => r.json());
      updateFilter(response);
    };
    if (searchQuery === "") {
    } else {
      fetching();
    }
  }, [searchQuery]);

  return (
    <Box borderRadius="1px">
      <Flex alignItems="center">
        <GroupingHeader px="0" color="teal.700">
          Search
        </GroupingHeader>
        <Tooltip
          hasArrow
          label={`Search for ${searchField.join(", ")}`}
          bg="gray.300"
          color="black"
        >
          <QuestionOutlineIcon ml="2" />
        </Tooltip>
      </Flex>
      <chakra.form
        onSubmit={(e) => {
          e.preventDefault();
          updateSearchQuery(inputQuery);
          updatePanelOpen(false);
        }}
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="search..."
            value={inputQuery}
            onChange={(e) => {
              e.preventDefault();
              setInputQuery(e.target.value);
            }}
          />
          <InputRightAddon>
            <IconButton
              type="submit"
              aria-label="search addresses"
              icon={<SearchIcon />}
            />
          </InputRightAddon>
        </InputGroup>
      </chakra.form>
    </Box>
  );
};
