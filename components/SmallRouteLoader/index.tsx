import { useEffect, useState } from "react";
import clsx from "clsx";

export const SmallRouteLoader = () => {
  const [visible, setVisible] = useState(false);

  // Fade-in AFTER mount → avoids flashes
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center",
        "transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className="
          h-8 w-8 
          animate-spin 
          rounded-full 
          border-[3px] 
          border-black/20 
          border-t-black 
          dark:border-white/20 
          dark:border-t-white
          shadow-lg
        "
      />
    </div>
  );
};
