import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import * as gtag from "../lib/gtag";
import { Provider, useHydrate } from "../lib/store";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useHydrate(pageProps.initialZustandState);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider initialStore={store}>
        <Layout height="100vh">
          <NextNprogress
            color="#FFFF00"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
          />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
