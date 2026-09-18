import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface IThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: IThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div whileHover={{ y: -2 }}>
      <Button
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "bg-card hover:bg-card p-0 border border-input rounded-full size-12 text-card-foreground cursor-pointer glass",
          className,
        )}
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </Button>
    </motion.div>
  );
}
