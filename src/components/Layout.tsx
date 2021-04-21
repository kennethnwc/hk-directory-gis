import Head from "next/head";

import { Flex, FlexProps, useColorMode } from "@chakra-ui/react";

import { Nav } from "./Nav";
import { Footer } from "./ui/Footer";
import { useRouter } from "next/router";

export const Layout = ({ children, ...props }: FlexProps) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Hong Kong Historical GIS (1900 to 1933)@HKUL</title>
      </Head>
      <Flex
        direction="column"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        {...props}
        height="100vh"
      >
        <Nav flex="0 1 auto" />
        {children}
        {router.pathname === "/" && <Footer />}
      </Flex>
    </>
  );
};
