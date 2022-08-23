import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";

export const MyMapContainer = styled(MapContainer)`
  width: 100vw;
  height: 100vh;
`;

export const MyMarker = styled(Marker)`
  width: 100px;
  height: 100px;
`;

export const MyPopup = styled(Popup)`
  width: 100px;
  height: 100px;
`;

export const MyTileLayer = styled(TileLayer)`
  width: 100px;
  height: 100px;
`;
