import { useEffect, useState } from "react";

export function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null);

  const updateTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay("Morning");
    } else if (hour < 17) {
      setTimeOfDay("Afternoon");
    } else {
      setTimeOfDay("Evening");
    }
  };

  useEffect(() => {
    updateTimeOfDay();

    // check again every minute (60000 milliseconds)
    const interval = setInterval(updateTimeOfDay, 60000);

    return () => clearInterval(interval);
  }, []);

  return { timeOfDay };
}
