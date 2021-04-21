import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { IAddress } from "../";
import { groupBy } from "../lib/groupBy";
import { useMyStore } from "../lib/store";
import { AddressCard } from "./ui/AddressCard";
import { GroupingHeader } from "./ui/GroupingHeader";
import { MyButton } from "./ui/MyButton";

const DownloadBox = dynamic(import("./DownloadBox"), {
  ssr: false,
});

type Props = {};

export const AddressList: React.FC<Props> = () => {
  const {
    panelPoints,
    updateGrouping,
    grouping,
    panelOpen,
    updatePanelOpen,
  } = useMyStore();

  const [maxItems, setMaxItems] = useState(() => panelPoints.slice(0, 100));

  useEffect(() => {
    setMaxItems(panelPoints.slice(0, 100));
  }, [panelPoints.map(({ uuid }) => uuid).join(",")]);

  let Display: JSX.Element[] | JSX.Element;

  switch (grouping) {
    case "year":
      let docs = groupBy(maxItems, "year") as {
        [key: string]: IAddress[];
      };
      Display = Object.entries(docs).map(([year, address]) => {
        return (
          <Box key={year}>
            <GroupingHeader>{year}</GroupingHeader>
            <Box>
              {address.map((point, i) => (
                <AddressCard key={i} raw={point} />
              ))}
            </Box>
          </Box>
        );
      });
      break;
    case "company_name":
      docs = groupBy(maxItems, "company_name") as {
        [key: string]: IAddress[];
      };
      Display = Object.entries(docs).map(([groupper, address]) => {
        return (
          <Box key={groupper}>
            <GroupingHeader>{groupper}</GroupingHeader>
            <Box>
              {address.map((point, i) => (
                <AddressCard key={i} raw={point} />
              ))}
            </Box>
          </Box>
        );
      });
      break;
    default:
      Display = (
        <>
          {maxItems.map((point, i) => (
            <AddressCard key={i} raw={point} />
          ))}
        </>
      );
      break;
  }

  return (
    <>
      {panelPoints && panelPoints.length > 0 && (
        <Box
          backgroundColor="white"
          position="absolute"
          zIndex="3"
          maxH="100%"
          overflowY="scroll"
          display={panelOpen ? "block" : "none"}
          maxW={["65%", "50%", "30%"]}
        >
          <Box
            position="sticky"
            top="0"
            background="white"
            borderBottom="2px gray solid"
          >
            <Flex p="1" flexWrap="wrap" flexDir="row" alignItems="center">
              <MyButton
                onClick={() => {
                  updatePanelOpen(false);
                }}
                mb="1"
              >
                X
              </MyButton>

              <MyButton
                ml="1"
                colorScheme="teal"
                variant={grouping === "year" ? "solid" : "outline"}
                onClick={() => {
                  updateGrouping("year");
                }}
              >
                Group by year
              </MyButton>
              <MyButton
                ml="1"
                colorScheme="teal"
                variant={grouping === "company_name" ? "solid" : "outline"}
                onClick={() => {
                  updateGrouping("company_name");
                }}
              >
                Group by Company
              </MyButton>
              <MyButton
                ml="1"
                onClick={() => {
                  updateGrouping("");
                }}
              >
                Reset
              </MyButton>

              <Box>
                Showing {maxItems.length} of {panelPoints.length} point(s)
              </Box>
              <DownloadBox data={panelPoints} />
            </Flex>
          </Box>
          {Display}
          {panelPoints.length > maxItems.length && (
            <MyButton
              onClick={() => {
                setMaxItems((prev) => [
                  ...prev,
                  ...panelPoints.slice(maxItems.length, maxItems.length + 100),
                ]);
              }}
            >
              Load More
            </MyButton>
          )}
        </Box>
      )}
    </>
  );
};
