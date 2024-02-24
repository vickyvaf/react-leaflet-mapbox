import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import locationPinIconUrl from "./assets/location-pin.png";
import { Distance } from "./components/Distance";
import dataTrackpoint from "./trackpoint1.json";

import { useEffect, useState } from "react";

const CustomIconMarker = new L.Icon({
  iconUrl: locationPinIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function App() {
  const [markers, setMarkers] = useState<[number, number][] | []>(
    dataTrackpoint as [number, number][]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkers((prevMarker) => {
        const newMarker = [...prevMarker];

        newMarker.shift();

        return newMarker;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <MapContainer
        center={[-7.802314059894921, 110.40159488921744]}
        zoom={18}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        <Distance />

        <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2FoeXVicnIiLCJhIjoiY2xxZzFlbXJnMGo0cjJqcWN1ZGJiN2E5OSJ9.PmqbfXCNKcByO32TrN_vCA" />

        <Polyline positions={markers as any} />

        <Marker position={markers[0]} icon={CustomIconMarker} />
      </MapContainer>
    </div>
  );
}
