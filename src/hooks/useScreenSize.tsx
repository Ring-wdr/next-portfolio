import { useEffect, useState } from "react";

export const useScreenSize = () => {
  // Initialize height to 0 for SSR safety
  const [height, setHeight] = useState(0);

  // Debounced resize handler
  const detectHeight = () => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);
    }
  };

  useEffect(() => {
    // Set initial height on client-side
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);
    }

    // Add event listener only on client-side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", detectHeight);
      // Cleanup function to remove event listener
      return () => window.removeEventListener("resize", detectHeight);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return height;
};
