import L, { CircleMarkerOptions } from "leaflet";

import { IAddress } from "../..";

interface CreateLeafletCluster {
  updatePanelOpen: (open: boolean) => void;
  updatePanelPoint: (point: IAddress[]) => void;
}

export const createLeafletCluster = ({
  updatePanelPoint,
  updatePanelOpen,
}: CreateLeafletCluster) => {
  return L.markerClusterGroup({
    removeOutsideVisibleBounds: true,
    spiderfyOnMaxZoom: true,
    zoomToBoundsOnClick: true,
    chunkedLoading: true,
    chunkInterval: 100,
    chunkProgress: () => {},
    disableClusteringAtZoom: 30,
    spiderfyDistanceMultiplier: 2,
  })
    .on("clusterclick", (e) => {
      updatePanelOpen(true);
      const points = (e.propagatedFrom.getAllChildMarkers() as any[])
        .map(
          ({ options }: { options: CircleMarkerOptions }) => options.metadata
        )
        .sort((a, b) => {
          if (a.uuid! > b.uuid!) {
            return -1;
          }
          return 1;
        }) as IAddress[];
      updatePanelPoint(points);
    })
    .on("click", (e) => {
      updatePanelOpen(true);
      const point = e.propagatedFrom.options.metadata;
      updatePanelPoint([point]);
    });
};
