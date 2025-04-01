import { cn } from "@/lib/utils";
import { StoreButton } from "./store-button";

type StoreButtonsProps = {
  className?: string;
  disabled?: boolean;
};

export function StoreButtons({
  className,
  disabled = false,
}: StoreButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 justify-center",
        className
      )}
    >
      <StoreButton type="ios" disabled={disabled} />
      <StoreButton type="android" disabled={disabled} />
    </div>
  );
}
