import React from "react";
import { GoLocation } from "react-icons/go";

import { Box, HStack, Icon } from "@chakra-ui/react";

import { IAddress } from "../..";
import { useMyStore } from "../../lib/store";
import { ItemText } from "./ItemText";

export const AddressCard: React.FC<{ raw: IAddress }> = ({ raw }) => {
  const { company_name, year, ...point } = raw;
  const { updatePanelOpen, updateMapFocus, grouping } = useMyStore();
  return (
    <Box m="5px" p="5px" backgroundColor="white" boxShadow="md">
      {grouping !== "company_name" && (
        <ItemText textTransform="uppercase" color="teal.600" fontWeight="bold">
          {company_name} {point.company_name_chinese}
        </ItemText>
      )}
      <HStack
        onClick={() => {
          updateMapFocus([
            point.geometry.coordinates[1],
            point.geometry.coordinates[0],
            point.uuid,
          ]);
          updatePanelOpen(true);
        }}
        _hover={{ cursor: "pointer", background: "yellow.200" }}
      >
        <ItemText>
          <strong>Address:</strong> {point.building_name} {point.match_addr}
        </ItemText>
        <Icon
          aria-label="Map Focus"
          as={GoLocation}
          color="teal.600"
          blockSize="1em"
        />
      </HStack>
      <ItemText>
        <strong>UUID:</strong> {point.uuid}
      </ItemText>
      {grouping !== "year" && (
        <ItemText>
          <strong>Year</strong>: {year}
        </ItemText>
      )}
      {point.business_description && (
        <ItemText>
          <strong>Business description:</strong> {point.business_description}
        </ItemText>
      )}
      {point.categories && (
        <ItemText>
          <strong>Business type:</strong>{" "}
          {point.categories.map(({ category }) => (
            <span key={point.uuid + category}>{category}</span>
          ))}
        </ItemText>
      )}
    </Box>
  );
};
