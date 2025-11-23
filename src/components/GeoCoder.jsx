import 'leaflet-control-geocoder';
import * as L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const GeoCoder = ({ onResult }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    const control = L.Control.geocoder({
      geocoder,
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e) {
        console.log(e);
        const { center } = e.geocode;
        onResult(center); // send lat/lng back to parent
        map.setView(center, 18);
      })
      .addTo(map);

    return () => map.removeControl(control);
  }, [map, onResult]);

  return null;
};

export default GeoCoder;
