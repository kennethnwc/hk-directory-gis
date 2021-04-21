import { NextPage } from "next";

import { Center, Container, Heading, Link, Text } from "@chakra-ui/react";

import { Acknowledgements } from "../components/Acknowledgements";

const About: NextPage = () => {
  return (
    <Center flex="1 1 auto" bg="gray.200">
      <Container maxW="container.xl">
        <Heading mt="5" fontSize="2xl">
          Introduction
        </Heading>
        <Text mt="10px" fontSize="lg">
          This digital humanities project is to apply GIS technology to portray
          the geographical landscape of the commercial activities on Hong Kong
          Island from 1900 to 1933. The objective of this project is to convert
          the conventional archival directories and the historical block-maps
          into GIS data to provide spatial distributions and visualization of
          commercial entities on Hong Kong Island in a web-based map.
        </Text>
        <Text mt="10px" fontSize="lg">
          The GIS datasets are drawn from a Research Project<sup>[1]</sup> via
          Dr Michael Ng (Faculty of Law, University of Hong Kong), in
          collaboration with Dr Edwin Chow (Texas State University), Prof David
          Wong (George Mason University) and Carlo Chan (University of
          Sheffield). The primary materials adopted from the Research Project to
          create this web-based GIS mapping project are old directories of Hong
          Kong<sup>[2]</sup> and block-maps of Hong Kong in 1901<sup>[3]</sup>.
          The historical directories list both public and private entities such
          as banks, merchants & traders, shipping firms, government offices,
          schools, churches, hotels, clubs and registered societies and
          associations. While the historical directories cover both Hong Kong
          Island and Kowloon side, the block-maps, however, illustrate only the
          geographical landscape of the urban areas of Hong Kong Island (around
          today’s Western District to Tai Hang). Therefore only the
          spatial-temporal data of Hong Kong Island on the early twentieth
          century is included in this GIS database at the moment. It is hoped
          that interested scholars will further conducting GIS research analysis
          on Kowloon Peninsula in the future.
        </Text>
        <Text mt="10px" fontSize="lg">
          In this GIS database, various business activities are grouped into
          categories for browsing purpose, names of companies & organizations
          and keywords of business description can also be searched. Spatial
          distributions of business entities are displayed with associated
          spatial data, overlay of the 1901 historical map is provided to
          visualize the original geographical phenomena.
        </Text>
        <br />
        Notes:
        <Text>
          <sup>[1]</sup> Michael Ng, Edwin Chow, David W.S. Wong and Carlo Lo,
          <cite>“Historical GIS study of Hong Kong, 1900s-1940s”</cite> (funded
          by Research Grant Council of the Hong Kong Government, project code:
          HKU 17407214)
        </Text>
        <Text>
          <sup>[2]</sup>{" "}
          <cite>
            The Chronicle & Directory for China, Japan & the Philippines
          </cite>
          (Hong Kong : Hongkong Daily Press, 1900-1933).
        </Text>
        <Text>
          <sup>[3]</sup> <cite>Plan of Victoria 1901</cite>, in 29 sheets, ref:
          HKRS209-1-1 (Hong Kong Public Records Office)
        </Text>
        References:
        <Text>
          Ng, M., T. E. Chow and D. W. S. Wong, 2016, Geographical dimension of
          colonial justice: using GIS in research on law and history,{" "}
          <cite>Law and History Review</cite>. 34(4):1027-1045.
        </Text>
        <Text>
          Chow, T. E., M. Ng, D. W. S. Wong, and C. C. Chan, 2019, Exploratory
          multivariate space–time analysis of colonial justice in Hong Kong
          during 1900–1930. <cite>GeoJournal</cite>. doi:
          <Link
            ml="1"
            colorScheme="blue"
            color="blue.500"
            isExternal
            href="http://dx.doi.org.eproxy.lib.hku.hk/10.1007/s10708-019-10066-6"
          >
            http://dx.doi.org.eproxy.lib.hku.hk/10.1007/s10708-019-10066-6
          </Link>
        </Text>
        <br></br>
        <Heading fontSize="2xl">Acknowledgements:</Heading>
        Users are required to acknowledge the followings as a source when data
        and/or content are used in the preparation of reports, papers,
        publications, maps.
        <Acknowledgements />
        <Heading mt="5" fontSize="2xl">
          Disclaimer:
        </Heading>{" "}
        While considerable effort has been devoted to conducting quality
        assurance on digitizing the base map, processing the geocoded
        directories and compiling the GIS dataset, the Research Project team and
        the HKU Libraries disclaim any responsibility for the accuracy or
        correctness of the data. If users encounter apparent errors or
        discrepancies in using the data, please contact:{" "}
        <Link color="blue.500" href="mailto:libtss@hku.hk">
          libtss@hku.hk
        </Link>
        <Text mb="5"></Text>
      </Container>
    </Center>
  );
};

export default About;
