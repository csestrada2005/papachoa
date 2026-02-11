import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassBlobButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tint?: "blush" | "sky" | "sage";
  badge?: React.ReactNode;
}

const tintMap = {
  blush: "glass-blob-blush",
  sky: "glass-blob-sky",
  sage: "glass-blob-sage",
} as const;

const GlassBlobButton = React.forwardRef<HTMLButtonElement, GlassBlobButtonProps>(
  ({ className, tint = "blush", badge, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "glass-blob-btn relative min-w-[44px] min-h-[44px] flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[50%]",
        tintMap[tint],
        className,
      )}
      {...props}
    >
      {/* Glass blob shape */}
      <span className="glass-blob-shape pointer-events-none" aria-hidden="true" />
      {/* Icon */}
      <span className="relative z-10">{children}</span>
      {/* Badge */}
      {badge && (
        <span className="absolute -top-0.5 -right-0.5 z-20">{badge}</span>
      )}
    </button>
  ),
);
GlassBlobButton.displayName = "GlassBlobButton";

export default GlassBlobButton;
