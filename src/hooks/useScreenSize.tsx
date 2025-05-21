import { useEffect, useState } from "react";

export const useScreenSize = () => {
  // Initialize height to 0 for SSR safety
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // All window interactions should be guarded
    if (typeof window !== "undefined") {
      // Define detectHeight *inside* useEffect to ensure the same reference
      const detectHeight = () => {
        setHeight(window.innerHeight);
      };

      // Set initial height on client-side
      setHeight(window.innerHeight);

      // Add event listener
      window.addEventListener("resize", detectHeight);

      // Cleanup function to remove event listener
      return () => window.removeEventListener("resize", detectHeight);
    }
    // If window is not defined (e.g., during SSR), return a no-op cleanup function
    return () => {};
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return height;
};
