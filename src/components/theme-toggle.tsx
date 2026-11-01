"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handelTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handelTheme}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border  bg-background text-foreground hover:bg-muted"
    >
      {/* CSS decides which icon shows, so the button always renders */}
      <Sun className="hidden h-5 w-5 text-sun dark:block" />
      <Moon className="h-5 w-5 text-brand dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
