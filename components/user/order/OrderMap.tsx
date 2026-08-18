"use client"; // Marks this as a browser-only component

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useOrder } from "@/context/OrderProvider";
import GeoCoder from "./GeoCorder";
import "leaflet/dist/leaflet.css";

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0 || center[1] !== 0) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

const OrderMap = () => {
  const { position, getPosition } = useGeolocation();
  console.log("position: ", position);
  const { mapPosition, setMapPosition } = useOrder();
  console.log("mapPosition: ", mapPosition);

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    if (position.lat !== 0 || position.lng !== 0) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <MapContainer center={mapPosition} zoom={18} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={mapPosition} />
      <GeoCoder
        onResult={(coords) => {
          setMapPosition([coords.lat, coords.lng]);
        }}
      />
    </MapContainer>
  );
};

export default OrderMap;
