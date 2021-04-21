import NextLink from "next/link";
import React, { useState } from "react";

import { Box, Button, Flex, FlexProps, Image, Link } from "@chakra-ui/react";

export const Nav: React.FC<FlexProps> = ({ children, ...props }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow((prev) => !prev);
  const bg = "#2cbb93";

  return (
    <Flex
      as="nav"
      wrap="wrap"
      bg={bg}
      color="white"
      justifyContent="space-between"
      p="8px"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      fontSize="1.5rem"
      {...props}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w={["100%", "100%", "100%", "auto"]}
      >
        <Flex flexDir="row" alignItems="center" flexWrap="wrap">
          <a href="https://lib.hku.hk">
            <Image
              style={{ height: "55px" }}
              alt="The University of Hong Kong Libraries "
              src="/HKULib-logo-Color-01.png"
            ></Image>
          </a>
          <NextLink href="/">
            <Link>
              <strong>Hong Kong Historical GIS (1900 to 1933)</strong>
            </Link>
          </NextLink>
        </Flex>

        <Box display={{ base: "block", lg: "none" }}>
          <Button
            bg="transparent"
            border="1px"
            onClick={handleToggle}
            width="100%"
          >
            <svg
              fill="white"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Button>
        </Box>
      </Flex>

      <Box
        id="nav-link"
        display={{ base: show ? "block" : "none", lg: "block" }}
        fontSize="md"
      >
        <MenuItems>
          <AllLinks />
        </MenuItems>
      </Box>
    </Flex>
  );
};

const AllLinks: React.FC = () => {
  return (
    <>
      <NextLink href="/about" passHref>
        <Link ml="10px">About</Link>
      </NextLink>

      <NextLink href="/data" passHref>
        <Link ml="10px">Data</Link>
      </NextLink>

      <Link ml="10px" href="https://lib.hku.hk/general/privacy.html">
        Privacy Policy
      </Link>

      <Link ml="10px" href="mailto:libtss@hku.hk">
        Contact Us
      </Link>
    </>
  );
};

const MenuItems: React.FC = ({ children }) => (
  <Box mr={6} display="flex" flexDirection={["column", "column", "row", "row"]}>
    {children}
  </Box>
);
