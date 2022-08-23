import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import { useEffect, useState } from "react";
import { MyMapContainer, MyMarker, MyPopup, MyTileLayer } from "./map.styles";
import mapPin from "./pin.svg";
import { LocationService } from "../../service/LocationService";

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function Localization(location: any) {
  const initialPosition = { lat: 51.505, lng: -0.09 };
  const [locationResponse, setLocationResponse] = useState(initialPosition);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    (async function getLocation() {
      try {
        const { data } = await LocationService.getLocation(
          `${locationResponse.lat},${locationResponse.lng}`
        );
        setLocationResponse({
          lat: data.features[0].center[0],
          lng: data.features[1].center[1],
        });
        setFeatures(data.features[0].place_name);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {" "}
      <MyMapContainer
        center={locationResponse}
        zoom={13}
        scrollWheelZoom={false}
      >
        <MyTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarker icon={mapPinIcon} position={locationResponse}>
          <MyPopup>{features}</MyPopup>
        </MyMarker>
      </MyMapContainer>
    </>
  );
}
export default Localization;
