import L from "leaflet";

import { IAddress } from "../..";

export const createCircleMarker = (point: IAddress) => {
  const { geometry } = point;
  const circle = L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
    fillColor: "blue",
    radius: 10,
    metadata: { ...point },
  });
  return circle;
};
