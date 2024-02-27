import L from "leaflet";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import { memo, useEffect, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import TruckIcon from "../assets/track-icon.png";
import { Distance } from "./Distance";
import { getCompassRotation } from "../libs/getCompassRotation";
import dataTrackpoint from "../trackpoint1.json";
import dataTrackpoint2 from "../trackpoint2.json";

const CustomIconMarker = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 24],
});

export const Heatmap = memo(() => {
  const heatmapOptions = {
    radius: 20,
    blur: 20,
    maxZoom: 18,
    minOpacity: 0.5,
    maxOpacity: 1,
  };

  console.log("heatmap rerender");

  return (
    <HeatmapLayer
      fitBoundsOnLoad
      fitBoundsOnUpdate
      points={dataTrackpoint}
      longitudeExtractor={(point: number[]) => point[1]}
      latitudeExtractor={(point: number[]) => point[0]}
      key={Math.random() + Math.random()}
      intensityExtractor={(point: string[]) => parseFloat(point[2])}
      {...heatmapOptions}
      gradient={{
        1: "#FE433C",
        0.8: "#F31D64",
        0.6: "#A224AD",
        0.4: " #6A38B3",
        0.2: " #3C50B1",
      }}
    />
  );
});

export default function Map() {
  const [markers, setMarkers] = useState<[number, number][] | []>(
    dataTrackpoint2 as [number, number][]
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

  const compassRotation = getCompassRotation(
    markers[0][0],
    markers[0][1],
    markers[1][0],
    markers[1][1]
  );

  const RotatedMarker = ({ children, ...props }: any) => {
    return <Marker {...props}>{children}</Marker>;
  };

  return (
    <MapContainer
      center={[-7.802314059894921, 110.40159488921744]}
      zoom={18}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <Distance />

      <Heatmap />

      <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2FoeXVicnIiLCJhIjoiY2xxZzFlbXJnMGo0cjJqcWN1ZGJiN2E5OSJ9.PmqbfXCNKcByO32TrN_vCA" />

      <Polyline positions={markers as any} />

      <RotatedMarker
        position={
          markers[0] || [
            dataTrackpoint[dataTrackpoint.length - 1][0],
            dataTrackpoint[dataTrackpoint.length - 1][1],
          ]
        }
        icon={CustomIconMarker}
        rotationAngle={Number(compassRotation.toFixed(0))}
        rotationOrigin="center"
      />
    </MapContainer>
  );
}
