"use client";
import * as L from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import GeocoderControl, { geocoders } from "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const GeoCoder = ({
  onResult,
}: {
  onResult: (coords: { lat: number; lng: number }) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = geocoders.nominatim();
    const control = new GeocoderControl({
      geocoder,
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        console.log(e);
        const { center } = e.geocode;
        onResult(center); // send lat/lng back to parent
        map.setView(center, 18);
      })
      .addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map, onResult]);

  return null;
};

export default GeoCoder;
