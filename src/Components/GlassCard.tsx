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
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={cn(
          "bg-transparent shadow-none backdrop-blur-none hover:backdrop-blur-xs -mx-6 p-6 border hover:border border-transparent ring-0 transition-all duration-300 hover:glass",
          className,
        )}
        {...props}
      />
    </motion.div>
  );
});

GlassCard.displayName = "GlassCard";
