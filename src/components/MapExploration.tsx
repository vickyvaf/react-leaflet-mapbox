import L, { LatLngExpression } from "leaflet";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import DriftMarker from "react-leaflet-drift-marker";
import TruckIcon from "../assets/track-icon.png";
import { calculateBearing } from "../libs/bearing";
import dataTrackpoint from "../trackpoint1.json";
import dataTrackpoint2 from "../trackpoint2.json";

const CustomIconMarker = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [40, 40],
  iconAnchor: [20, 24],
});

const DEFAULT_MAP_COORDS = [
  -7.792656578378797, 110.3931093005286,
] as LatLngExpression;

const ZOOM_LEVEL = 18;
const MAX_ZOOM_LEVEL = 22;

const TARGET_COORDS = [-7.784749, 110.395065] as LatLngExpression;

const SetViewOnClick = ({ animateRef }: any) => {
  animateRef.current = !animateRef.current;

  const map = useMapEvent("click", (e) => {
    map.flyTo(e.latlng, map.getZoom(), {
      animate: animateRef.current || false,
      duration: 0.5,
    });
  });

  return null;
};

export function MapExploration() {
  const [markers, setMarkers] = useState<[number, number][] | []>(
    dataTrackpoint2 as [number, number][]
  );

  const mapRef = useRef<any>(null);
  const animateRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      const bearing = calculateBearing(
        markers[i][0],
        markers[i][1],
        markers[i + 1][0],
        markers[i + 1][1]
      );

      if (mapRef.current) {
        mapRef.current?.setView(markers[i], mapRef.current.getZoom(), {
          animate: true,
          duration: 1,
        });
      }

      if (markerRef.current) {
        markerRef.current.setLatLng(markers[i]);
        markerRef.current.setRotationAngle(bearing);
        markerRef.current.setRotationOrigin(markerRef.current.rotationOrigin);
      }

      i += 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log("render");

  return (
    <MapContainer
      center={DEFAULT_MAP_COORDS}
      zoom={ZOOM_LEVEL}
      maxZoom={MAX_ZOOM_LEVEL}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        maxZoom={MAX_ZOOM_LEVEL}
        maxNativeZoom={MAX_ZOOM_LEVEL}
        url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2FoeXVicnIiLCJhIjoiY2xxZzFlbXJnMGo0cjJqcWN1ZGJiN2E5OSJ9.PmqbfXCNKcByO32TrN_vCA"
      />

      <SetViewOnClick animateRef={animateRef} />

      {/* <Marker
        position={
          markers[index] || [
            dataTrackpoint[dataTrackpoint.length - 1][0],
            dataTrackpoint[dataTrackpoint.length - 1][1],
          ]
        }
        icon={CustomIconMarker}
        ref={markerRef}
      /> */}

      <DriftMarker
        duration={1000}
        position={
          markers[0] || [
            dataTrackpoint[dataTrackpoint.length - 1][0],
            dataTrackpoint[dataTrackpoint.length - 1][1],
          ]
        }
        icon={CustomIconMarker}
        ref={markerRef}
        eventHandlers={{
          click: () => {
            if (mapRef.current) {
              mapRef.current.flyTo(TARGET_COORDS, MAX_ZOOM_LEVEL, {
                animate: true,
                duration: 0.4,
              });
            }
          },
        }}
      />
    </MapContainer>
  );
}
