import React from "react";

import { Center, Container, Link, SimpleGrid, Text } from "@chakra-ui/react";

import { Acknowledgements } from "../components/Acknowledgements";

const availableYear = Array.from(Array(34), (_, i) => i + 1900).filter(
  (i) => i !== 1905
);

const DataPage = () => {
  return (
    <Center flex="1 1 auto" bg="gray.200">
      <Container maxW="container.xl">
        <Text mb="2">
          The dataset is available for download in Geo JSON format. It includes
          names of public and private entities, business descriptions, addresses
          and geocoding. Original data source is drawn from the Hong Kong
          section of The Chronicle & Directory for China, Japan & the
          Philippines (Hong Kong : Hongkong Daily Press, 1900-1933).
        </Text>
        <Text mb="2">
          While the dataset is freely accessible, however, when you publish
          these data based on the dataset, you are required to cite the data in
          your publication and include the following acknowledgements:
        </Text>
        <Acknowledgements />

        <Text mt="2">
          Please note that <cite>Historical GIS of Hong Kong</cite> database is
          created for personal and non-commercial use, any commercial use of the
          database contents is prohibited without prior permission from the
          University of Hong Kong Libraries.
        </Text>

        <Text fontSize="lg" mt="2">
          GeoJSON (1900 - 1933)
        </Text>
        <SimpleGrid mt="1" columns={5}>
          {availableYear.map((year) => (
            <Link color="blue.500" key={year} href={`/api/download?q=${year}`}>
              {year}
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Center>
  );
};

export default DataPage;
