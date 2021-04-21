import NextLink from "next/link";
import React from "react";

import { Link } from "@chakra-ui/react";

export const Acknowledgements = () => {
  return (
    <ul style={{ listStyleType: "square" }}>
      <li>
        Michael Ng, Edwin Chow, David W.S. Wong and Carlo Lo,{" "}
        <cite>“Historical GIS study of Hong Kong, 1900s-1940s”</cite> (funded by
        Research Grant Council of the Hong Kong Government, project code: HKU
        17407214)
      </li>
      <li>
        <cite>Historical GIS of Hong Kong</cite>, the University of Hong Kong
        Libraries,
        <NextLink href="/" passHref>
          <Link ml="1" color="blue.500">
            https://hkh-gis.lib.hku.hk/
          </Link>
        </NextLink>
      </li>
    </ul>
  );
};
