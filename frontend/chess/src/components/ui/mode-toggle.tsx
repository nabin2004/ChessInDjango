import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../theme-provider";
import { Switch } from "./switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative flex items-center"
      >
        <Sun
          className={`h-[1.5rem] w-[1.5rem] transition-opacity duration-300 ${
            theme === "dark" ? "opacity-0" : "opacity-100"
          }`}
        />
        <Moon
          className={`h-[1.5rem] w-[1.5rem] transition-opacity duration-300 absolute ${
            theme === "dark" ? "opacity-100" : "opacity-0"
          }`}
        />
      </Button>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="ml-2"
      />
    </div>
  );
}
