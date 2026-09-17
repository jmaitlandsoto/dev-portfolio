import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export interface IThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: IThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      variant="theme"
      className={cn(
        "p-0 border rounded-full size-12 cursor-pointer",
        className,
      )}
    >
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Toggle>
  );
}
