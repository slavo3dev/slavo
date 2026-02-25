import { FC } from "react";
import Image from "next/image";

type PreloaderProps = {
  overlay?: boolean;
};

export const Preloader: FC<PreloaderProps> = ({
  overlay = false,
}) => {
  return (
    <div
      className={
        overlay
          ? "fixed inset-0 z-[9999] bg-white flex justify-center items-center"
          : "flex justify-center items-center min-h-screen"
      }
      // Helps accessibility a bit (optional)
      aria-busy="true"
      aria-live="polite"
    >
      <Image
        id="preloader-active"
        className="animate-bounce"
        src="/images/logo/slavoio-logo.png"
        width={300}
        height={300}
        alt="Slavo logo"
        priority
      />
    </div>
  );
};
