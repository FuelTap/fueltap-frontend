import { useState } from "react";

export function useGeolocation(defaultPosition = { lat: 0, lng: 0 }) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    defaultPosition,
  );
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, position, error, getPosition };
}
