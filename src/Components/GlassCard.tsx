import * as React from "react";
import { motion } from "framer-motion";
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
    <motion.div
      ref={ref}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={cn(
          "ring-0 transition-all duration-300 bg-transparent backdrop-blur-none border border-transparent shadow-none hover:bg-white/[0.06] hover:backdrop-blur-3xl hover:border-white/[0.1] hover:shadow-[inset_0_-2px_0_0_rgba(255,255,255,0.1),0_4px_24px_rgba(0,0,0,0.3)]",
          className,
        )}
        {...props}
      />
    </motion.div>
  );
});

GlassCard.displayName = "GlassCard";
