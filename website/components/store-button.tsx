import { cn } from "@/lib/utils";
import Image from "next/image";

type StoreButtonProps = {
  type: "ios" | "android";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function StoreButton({
  type,
  className,
  disabled = false,
  onClick,
}: StoreButtonProps) {
  const storeImages = {
    ios: {
      src: "/app-store-badge.svg",
      alt: "Download on the App Store",
      width: 120,
      height: 40,
    },
    android: {
      src: "/google-play-badge.png",
      alt: "Get it on Google Play",
      width: 135,
      height: 40,
    },
  };

  const image = storeImages[type];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative transition-transform duration-200 hover:scale-105 active:scale-95",
        disabled &&
          "cursor-not-allowed opacity-60 hover:scale-100 active:scale-100",
        className
      )}
      data-tooltip-id="clarity-tooltip"
      data-tooltip-content={disabled ? "Coming soon!" : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-[40px] w-auto"
      />
    </button>
  );
}
