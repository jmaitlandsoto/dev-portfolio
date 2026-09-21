import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { all } from "three/src/nodes/math/MathNode.js";

export const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, onMouseEnter, onMouseLeave, ...props }, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, {
    amount: "some",
    margin: "-35% 0% -35% 0%",
  });
  return (
    <div ref={cardRef}>
      <Card
        className={cn(
          "bg-transparent shadow-none backdrop-blur-none -mx-6 p-4 md:p-6 py-6 border border-transparent ring-0 transition-all opacity-60 duration-200 ease-out",
          inView ? "glass! opacity-100" : "hover:glass hover:opacity-100",
          className,
        )}
        {...props}
      />
    </div>
  );
});

GlassCard.displayName = "GlassCard";
