import { Earth } from "lucide-react";
import clsx from "clsx";

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 24 }: LogoProps) {
  return (
      <Earth  strokeWidth={1} size={size}className={clsx("text-foreground", className)} />
  );
}
