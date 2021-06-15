import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import React, { Fragment } from "react";

import { ColorModeScript } from "@chakra-ui/react";

import { GA_TRACKING_ID } from "../lib/gtag";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <Fragment>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
              }}
            />
          </Fragment>
        </Head>

        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
