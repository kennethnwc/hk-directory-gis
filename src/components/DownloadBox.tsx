import { saveAs } from "file-saver";
import React from "react";

import { Button } from "@chakra-ui/react";

import { IAddress } from "../";

const convertJSONToGeoJson = (data: IAddress[]) => {
  let geoJson: { [key: string]: any } = { type: "FeatureCollection" };
  let features = data.map(({ categories, geometry, ...rest }) => ({
    type: "Feature",
    geometry,
    properties: {
      categores: categories.map(({ category }) => category),
      ...rest,
    },
  }));
  geoJson["features"] = features;
  return geoJson;
};

type Props = {
  data: IAddress[];
};

export const DownloadBox: React.FC<Props> = ({ data }) => {
  const file = new File(
    [JSON.stringify(convertJSONToGeoJson(data), null, 2)],
    "historical_gis_filtered_data.json",
    {
      type: "application/json;charset=utf-8",
    }
  );

  return (
    <>
      <Button
        ml="1"
        onClick={() => {
          saveAs(file);
        }}
      >
        Export
      </Button>
    </>
  );
};

export default DownloadBox;
