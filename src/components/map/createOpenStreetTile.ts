import L from "leaflet";

export const createOpenStreetTileToMap = () => {
  return L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxNativeZoom: 30,
    maxZoom: 30,
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });
};
