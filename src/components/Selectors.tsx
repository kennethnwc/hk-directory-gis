import React, { useEffect } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import { getDataToDisplay } from "../lib/getDataToDisplay";
import { useMyStore } from "../lib/store";
import { useCheckedItems } from "../lib/useCheckedItems";

export const Selectors: React.FC = () => {
  const {
    mapFilter,
    allData,
    searchQuery,
    updateCheckedYear,
    updateCheckedBusiness,
  } = useMyStore();
  const { checkedItems, handleChecked, setCheckedItems } = useCheckedItems();
  const data = getDataToDisplay({ searchQuery, allData, mapFilter });

  useEffect(() => {
    updateCheckedYear(checkedItems["year"] as Set<number>);
    updateCheckedBusiness(checkedItems["business"] as Set<string>);
  }, [checkedItems]);

  const yearThatCanSelect = [...new Set(data.map(({ year }) => year))];
  const businessThatCanSelect = [
    ...new Set(
      data.flatMap((item) => item.categories).map(({ category }) => category)
    ),
  ];

  const setAllOrNoneFilter = (all: boolean, field: "year" | "business") => {
    if (all) {
      setCheckedItems(() => {
        return {
          year: new Set(data.map(({ year }) => year)),
          business: new Set(
            new Set(
              data
                .flatMap((item) => item.categories)
                .map(({ category }) => category)
            )
          ),
        };
      });
    } else {
      setCheckedItems((prev) => {
        if (field === "year") {
          return { ...prev, year: new Set() };
        } else {
          return {
            ...prev,
            business: new Set(),
          };
        }
      });
    }
  };

  const isAllYear = yearThatCanSelect.length === checkedItems["year"].size;
  const isAllBusiness =
    businessThatCanSelect.length === checkedItems["business"].size;

  return (
    <Accordion allowMultiple defaultIndex={[0]} fontSize="sm">
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex flexDir="row">
              Year Filter
              {!isAllYear && checkedItems["year"].size === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  Select at least one year to view points
                </Alert>
              )}
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Checkbox
            colorScheme="green"
            isChecked={isAllYear}
            spacing="0.1em"
            mr="1em"
            onChange={(e) => {
              setAllOrNoneFilter(e.target.checked, "year");
            }}
          >
            All
          </Checkbox>
          <CheckboxGroup colorScheme="green" value={[...checkedItems["year"]]}>
            <Flex flexWrap="wrap" maxW="500px">
              {yearThatCanSelect.map((year) => (
                <Checkbox
                  key={year}
                  value={year}
                  spacing="0.1em"
                  mr="1em"
                  onChange={(e) => {
                    handleChecked("year", Number(e.currentTarget.value));
                  }}
                >
                  {year}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex flexDir="row">
              Business Filter
              {!isAllBusiness && checkedItems["business"].size === 0 && (
                <Alert status="info">
                  <AlertIcon />
                  Select at least one business to view points
                </Alert>
              )}
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel maxH="30vh" overflowY="auto">
          <Checkbox
            colorScheme="green"
            spacing="0.1em"
            mr="1em"
            isChecked={isAllBusiness}
            onChange={(e) => {
              setAllOrNoneFilter(e.target.checked, "business");
            }}
          >
            All
          </Checkbox>
          <CheckboxGroup
            colorScheme="green"
            value={[...checkedItems["business"]]}
          >
            <SimpleGrid columns={2} spacing={0}>
              {businessThatCanSelect.map((category) => (
                <Checkbox
                  key={category}
                  value={category}
                  spacing="0.1em"
                  mr="1em"
                  onChange={(e) => {
                    handleChecked("business", e.currentTarget.value);
                  }}
                >
                  {category}
                </Checkbox>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
