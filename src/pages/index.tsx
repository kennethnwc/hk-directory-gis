import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

import { AddressList } from "../components/AddressList";
import { SearchBox } from "../components/SearchBox";
import { Selectors } from "../components/Selectors";
import { useMyStore } from "../lib/store";

const MyMap = dynamic(() => import("../components/map/MyMap"), { ssr: false });
const DownloadBox = dynamic(import("../components/DownloadBox"), {
  ssr: false,
});

const IndexPage: NextPage = () => {
  const { panelPoints, updateBaseMap, baseMap, filteredData } = useMyStore();
  const [show, setShow] = useState(true);

  return (
    <Box position="relative" zIndex="1" w="100%" flex="1 1 auto">
      {panelPoints && panelPoints.length > 0 && <AddressList />}
      <Box
        position="absolute"
        zIndex="2"
        right="1"
        marginTop="5px"
        borderRadius="1px"
        backgroundColor="white"
        p="10px"
      >
        <Button
          float="right"
          bottom="5px"
          onClick={(e) => {
            e.preventDefault();
            setShow((prev) => !prev);
          }}
        >
          {show ? "Hide" : "Show"}
        </Button>
        <Box display={show ? "block" : "none"}>
          <SearchBox />
          <Flex flexDir="row" alignItems="center" my="1">
            <Box pl="16px">Total Points: {filteredData.length}</Box>{" "}
            <DownloadBox data={filteredData} />
          </Flex>
          <Selectors />
          <Button
            mt="5px"
            variant={baseMap ? "solid" : "outline"}
            colorScheme="teal"
            onClick={(e) => {
              e.preventDefault();
              updateBaseMap();
            }}
          >
            1901 Base Map
          </Button>
        </Box>
      </Box>
      <Box h="85vh" zIndex="1">
        <MyMap />
      </Box>
    </Box>
  );
};

export const getStaticProps = async () => {
  const requestURI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/dev_addresses"
      : "http://localhost:8000/addresses";
  const result = await fetch(requestURI).then((r) => r.json());
  return {
    props: {
      initialZustandState: {
        allData: result,
      },
    },
  };
};

export default IndexPage;
