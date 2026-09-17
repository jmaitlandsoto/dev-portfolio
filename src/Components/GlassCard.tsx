import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.classList.add("card-hovered");
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.classList.remove("card-hovered");
    onMouseLeave?.(e);
  };

  return (
    <Card
      ref={ref}
      className={cn(
        "ring-0 transition-all duration-300 bg-transparent backdrop-blur-none border border-transparent shadow-none hover:bg-white/[0.06] hover:backdrop-blur-3xl hover:border-white/[0.1] hover:shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1),0_4px_24px_rgba(0,0,0,0.3)]",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
});

GlassCard.displayName = "GlassCard";
