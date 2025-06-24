import { useState, useEffect } from "react";

export const useKeyboardVisible = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const threshold = 150;
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setKeyboardOpen(heightDiff > threshold);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return keyboardOpen;
};
