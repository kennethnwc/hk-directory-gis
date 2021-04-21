import { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

import { ChakraProvider } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { useHydrate } from "../lib/store";
import { StoreProvider } from "../lib/zustandProvider";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useHydrate(pageProps.initialZustandState);
  return (
    <ChakraProvider resetCSS theme={theme}>
      <StoreProvider store={store}>
        <Layout height="100vh">
          <NextNprogress
            color="#FFFF00"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
          />
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
