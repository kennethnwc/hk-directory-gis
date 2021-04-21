import L, { Icon, latLngBounds } from "leaflet";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";

import { getDataToDisplay } from "../../lib/getDataToDisplay";
import { useMyStore } from "../../lib/store";
import { createCircleMarker } from "./createCircleMarker";
import { createLeafletCluster } from "./createMarkerCluster";
import { createOpenStreetTileToMap } from "./createOpenStreetTile";

const markerIcon = new Icon({
  ...Icon.Default.prototype.options,
  iconUrl: "/images/leaflet/marker-icon.png",
  iconRetinaUrl: "/images/leaflet/marker-icon-2x.png",
  shadowUrl: "/images/leaflet/marker-shadow.png",
});

const MyMap = () => {
  const {
    allData,
    mapFilter,
    searchQuery,
    updatePanelPoint,
    updatePanelOpen,
    mapFocus,
    baseMap,
    checkedYear,
    checkedBusiness,
    updateFilteredData,
  } = useMyStore();

  const clusterRef = React.useRef<L.MarkerClusterGroup>();
  const mapRef = React.useRef<L.Map>();
  const baseMapRef = React.useRef<L.TileLayer[]>();
  const markersRef = React.useRef<L.Circle[]>();
  const timerMarkerRef = React.useRef<L.Marker>();

  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [22.26585067290815, 114.20184966790517],
      zoom: 13,
      maxZoom: 20,
    });

    // add open street world map
    mapRef.current.addLayer(createOpenStreetTileToMap());
    clusterRef.current = createLeafletCluster({
      updatePanelOpen,
      updatePanelPoint,
    }).addTo(mapRef.current!);

    clusterRef.current.clearLayers();

    return () => {
      clusterRef.current?.clearLayers();
      mapRef.current!.remove();
    };
  }, []);

  useEffect(() => {
    clusterRef.current?.clearLayers();

    const data = getDataToDisplay({ searchQuery, mapFilter, allData }).filter(
      (point) => {
        const hasYear = checkedYear.has(point.year);
        const hasCategory =
          point.categories.filter(({ category }) =>
            checkedBusiness.has(category)
          ).length > 0;

        return hasYear && hasCategory;
      }
    );

    updateFilteredData(data);

    markersRef.current = data.map((point) => createCircleMarker(point));
    clusterRef.current!.addLayers(markersRef.current);
  }, [
    mapFilter.length,
    searchQuery,
    [...checkedBusiness, ...checkedYear].join(" "),
  ]);

  // Add 1900 base map
  useEffect(() => {
    if (baseMap) {
      baseMapRef.current = [
        L.tileLayer("/1900A/{z}/{x}/{y}.png", {
          minNativeZoom: 12,
          maxNativeZoom: 20,
          maxZoom: 20,
          bounds: latLngBounds(
            [22.28115025761561, 114.14262790321108],
            [22.29184967186874, 114.12479684651065]
          ),
          id: "1900A",
        }).addTo(mapRef!.current!),
        L.tileLayer("/1900B/{z}/{x}/{y}.png", {
          maxNativeZoom: 20,
          minNativeZoom: 12,
          maxZoom: 20,
          bounds: [
            [22.269936616555388, 114.15584788186098],
            [22.28951481740115, 114.1447691088787],
          ],
          id: "1900B",
        }).addTo(mapRef!.current!),
        L.tileLayer("/1900C/{z}/{x}/{y}.png", {
          minNativeZoom: 12,
          maxNativeZoom: 30,
          maxZoom: 30,
          bounds: [
            [22.26983223198066, 114.1759022340426],
            [22.28718948120821, 114.15734922059261],
          ],
          id: "1900C",
        }).addTo(mapRef!.current!),
        L.tileLayer("/1900D/{z}/{x}/{y}.png", {
          minNativeZoom: 12,
          maxNativeZoom: 30,
          maxZoom: 30,
          bounds: [
            [22.26600607660499, 114.19653801289545],
            [22.286470064851777, 114.18045602939803],
          ],
          id: "1900D",
        }).addTo(mapRef!.current!),
      ];
    } else if (baseMapRef.current) {
      baseMapRef.current.map((tile) => {
        mapRef.current!.removeLayer(tile);
      });
    }
  }, [baseMap]);

  useEffect(() => {
    if (
      JSON.stringify(mapFocus) ==
      JSON.stringify([22.28020088065716, 114.155015444211, 0])
    ) {
    } else {
      if (timerMarkerRef.current) {
        mapRef.current?.removeLayer(timerMarkerRef.current);
      }
      timerMarkerRef.current = L.marker([mapFocus[0], mapFocus[1]], {
        icon: markerIcon,
      }).addTo(mapRef.current!);
      let timer = setTimeout(() => {
        mapRef.current?.removeLayer(timerMarkerRef.current!);
      }, 2000);

      mapRef.current?.flyTo([mapFocus[0], mapFocus[1]], 20, { duration: 1 });

      return () => {
        clearTimeout(timer);
      };
    }
  }, [...mapFocus]);

  return <Box id="map" w="100%" h="100%" zIndex="1" />;
};

export default MyMap;
