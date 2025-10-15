import { useEffect, useState } from 'react';

export function useScreenSize() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Define the function that checks the screen width
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        // Tailwind's lg = 1024px
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Run it once when the component mounts
    checkScreenSize();

    // Add a resize event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup when component unmounts
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isSmallScreen };
}
